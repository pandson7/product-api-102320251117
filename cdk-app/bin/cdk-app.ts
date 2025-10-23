#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductApi102320251117Stack } from '../lib/product-api-102320251117-stack';

const app = new cdk.App();
new ProductApi102320251117Stack(app, 'ProductApi102320251117Stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
