import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import * as path from 'path';

export class ProductApi102320251117Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const productsTable = new dynamodb.Table(this, 'ProductsTable-102320251117', {
      tableName: 'Products-102320251117',
      partitionKey: {
        name: 'productId',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Lambda Functions
    const getProductsFunction = new lambda.Function(this, 'GetProductsFunction-102320251117', {
      functionName: 'GetProducts-102320251117',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'getProducts.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/src')),
      environment: {
        TABLE_NAME: productsTable.tableName
      },
      timeout: cdk.Duration.seconds(30)
    });

    const getProductByIdFunction = new lambda.Function(this, 'GetProductByIdFunction-102320251117', {
      functionName: 'GetProductById-102320251117',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'getProductById.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/src')),
      environment: {
        TABLE_NAME: productsTable.tableName
      },
      timeout: cdk.Duration.seconds(30)
    });

    const seedDataFunction = new lambda.Function(this, 'SeedDataFunction-102320251117', {
      functionName: 'SeedData-102320251117',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'seedData.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/src')),
      environment: {
        TABLE_NAME: productsTable.tableName
      },
      timeout: cdk.Duration.seconds(60)
    });

    // Grant DynamoDB permissions
    productsTable.grantReadData(getProductsFunction);
    productsTable.grantReadData(getProductByIdFunction);
    productsTable.grantWriteData(seedDataFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductApi-102320251117', {
      restApiName: 'Product API 102320251117',
      description: 'API for accessing product specifications',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key']
      }
    });

    // API Gateway Integrations
    const getProductsIntegration = new apigateway.LambdaIntegration(getProductsFunction);
    const getProductByIdIntegration = new apigateway.LambdaIntegration(getProductByIdFunction);

    // API Routes
    const products = api.root.addResource('products');
    products.addMethod('GET', getProductsIntegration);

    const productById = products.addResource('{id}');
    productById.addMethod('GET', getProductByIdIntegration);

    // Custom Resource to seed data
    const seedDataProvider = new cr.Provider(this, 'SeedDataProvider-102320251117', {
      onEventHandler: seedDataFunction
    });

    new cdk.CustomResource(this, 'SeedDataResource-102320251117', {
      serviceToken: seedDataProvider.serviceToken
    });

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'Product API URL'
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: productsTable.tableName,
      description: 'DynamoDB Table Name'
    });
  }
}
