const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    try {
        const productId = event.pathParameters?.id;
        
        if (!productId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Bad Request',
                    message: 'Product ID is required'
                })
            };
        }

        const command = new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                productId: productId
            }
        });

        const result = await docClient.send(command);
        
        if (!result.Item) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({
                    error: 'Not Found',
                    message: `Product with ID ${productId} not found`
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.Item)
        };
    } catch (error) {
        console.error('Error retrieving product:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: 'Failed to retrieve product'
            })
        };
    }
};
