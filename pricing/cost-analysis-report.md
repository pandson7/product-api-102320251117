# Product API Solution Cost Analysis Estimate Report

## Service Overview

Product API Solution is a fully managed, serverless service that allows you to This project uses multiple AWS services.. This service follows a pay-as-you-go pricing model, making it cost-effective for various workloads.

## Pricing Model

This cost analysis estimate is based on the following pricing model:
- **ON DEMAND** pricing (pay-as-you-go) unless otherwise specified
- Standard service configurations without reserved capacity or savings plans
- No caching or optimization techniques applied

## Assumptions

- Standard ON DEMAND pricing model for all services
- US East (N. Virginia) region pricing
- No caching enabled on API Gateway
- Lambda functions use 256 MB memory allocation
- DynamoDB configured for on-demand billing
- Average API response size of 2KB
- No data transfer costs between services in same region
- CloudWatch logs retention for 30 days

## Limitations and Exclusions

- Data transfer costs to/from internet
- Custom domain name costs for API Gateway
- Reserved capacity pricing options
- Development and testing costs
- Monitoring and alerting setup costs
- Backup and disaster recovery costs

## Cost Breakdown

### Unit Pricing Details

| Service | Resource Type | Unit | Price | Free Tier |
|---------|--------------|------|-------|------------|
| Amazon API Gateway | Rest Api Requests | million requests (first 333 million) | $3.50 | No free tier for API Gateway |
| Amazon API Gateway | Http Api Requests | million requests (first 300 million) | $1.00 | No free tier for API Gateway |
| AWS Lambda | Requests | 1,000,000 requests | $0.20 | First 12 months: 1M requests and 400,000 GB-seconds free |
| AWS Lambda | Compute | GB-second | $0.0000166667 | First 12 months: 1M requests and 400,000 GB-seconds free |
| Amazon DynamoDB | Read Requests | million read request read requests | $0.125 | First 12 months: 25 GB storage, 25 WCU, 25 RCU free |
| Amazon DynamoDB | Write Requests | million write request write requests | $0.625 | First 12 months: 25 GB storage, 25 WCU, 25 RCU free |
| Amazon DynamoDB | Storage | GB-month (after 25 GB free) | $0.25 | First 12 months: 25 GB storage, 25 WCU, 25 RCU free |
| Amazon CloudWatch | Log Ingestion | GB ingested | $0.50 | 5 GB log ingestion, 10 custom metrics free |
| Amazon CloudWatch | Log Storage | GB-month | $0.03 | 5 GB log ingestion, 10 custom metrics free |
| Amazon CloudWatch | Custom Metrics | metric per month | $0.30 | 5 GB log ingestion, 10 custom metrics free |

### Cost Calculation

| Service | Usage | Calculation | Monthly Cost |
|---------|-------|-------------|-------------|
| Amazon API Gateway | Processing 100,000 API requests per month with REST API (Api Requests: 100,000 requests per month) | $3.50/1M × 0.1M requests = $0.35 per month | $0.35 |
| AWS Lambda | 100,000 invocations per month, 256 MB memory, 1 second average duration (Requests: 100,000 requests per month, Compute: 100,000 × 1s × 0.25GB = 25,000 GB-seconds) | $0.20/1M × 0.1M requests + $0.0000166667 × 25,000 GB-seconds = $0.02 + $0.42 = $0.44 (covered by free tier) | $0.02 |
| Amazon DynamoDB | 100,000 read requests and 20,000 write requests per month, 1 GB storage (Read Requests: 100,000 read request units, Write Requests: 20,000 write request units, Storage: 1 GB per month) | $0.125/1M × 0.1M reads + $0.625/1M × 0.02M writes + $0.25 × 0GB (within free tier) = $0.0125 + $0.0125 + $0.00 = $0.025 | $0.26 |
| Amazon CloudWatch | Basic monitoring and logging for Lambda and API Gateway (Log Ingestion: 1 GB per month, Log Storage: 1 GB average, Custom Metrics: 5 metrics) | Mostly covered by free tier, estimated $0.50 for additional usage | $0.50 |
| **Total** | **All services** | **Sum of all calculations** | **$1.13/month** |

### Free Tier

Free tier information by service:
- **Amazon API Gateway**: No free tier for API Gateway
- **AWS Lambda**: First 12 months: 1M requests and 400,000 GB-seconds free
- **Amazon DynamoDB**: First 12 months: 25 GB storage, 25 WCU, 25 RCU free
- **Amazon CloudWatch**: 5 GB log ingestion, 10 custom metrics free

## Cost Scaling with Usage

The following table illustrates how cost estimates scale with different usage levels:

| Service | Low Usage | Medium Usage | High Usage |
|---------|-----------|--------------|------------|
| Amazon API Gateway | $0/month | $0/month | $0/month |
| AWS Lambda | $0/month | $0/month | $0/month |
| Amazon DynamoDB | $0/month | $0/month | $0/month |
| Amazon CloudWatch | $0/month | $0/month | $1/month |

### Key Cost Factors

- **Amazon API Gateway**: Processing 100,000 API requests per month with REST API
- **AWS Lambda**: 100,000 invocations per month, 256 MB memory, 1 second average duration
- **Amazon DynamoDB**: 100,000 read requests and 20,000 write requests per month, 1 GB storage
- **Amazon CloudWatch**: Basic monitoring and logging for Lambda and API Gateway

## Projected Costs Over Time

The following projections show estimated monthly costs over a 12-month period based on different growth patterns:

Base monthly cost calculation:

| Service | Monthly Cost |
|---------|-------------|
| Amazon API Gateway | $0.35 |
| AWS Lambda | $0.02 |
| Amazon DynamoDB | $0.26 |
| Amazon CloudWatch | $0.50 |
| **Total Monthly Cost** | **$1** |

| Growth Pattern | Month 1 | Month 3 | Month 6 | Month 12 |
|---------------|---------|---------|---------|----------|
| Steady | $1/mo | $1/mo | $1/mo | $1/mo |
| Moderate | $1/mo | $1/mo | $1/mo | $1/mo |
| Rapid | $1/mo | $1/mo | $1/mo | $3/mo |

* Steady: No monthly growth (1.0x)
* Moderate: 5% monthly growth (1.05x)
* Rapid: 10% monthly growth (1.1x)

## Detailed Cost Analysis

### Pricing Model

ON DEMAND


### Exclusions

- Data transfer costs to/from internet
- Custom domain name costs for API Gateway
- Reserved capacity pricing options
- Development and testing costs
- Monitoring and alerting setup costs
- Backup and disaster recovery costs

### Recommendations

#### Immediate Actions

- Use HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Optimize Lambda memory allocation based on actual usage patterns
- Consider provisioned capacity for DynamoDB if usage becomes predictable
- Implement API response caching to reduce Lambda invocations
#### Best Practices

- Monitor CloudWatch metrics to identify optimization opportunities
- Set up billing alerts for cost monitoring
- Use AWS Cost Explorer to track spending trends
- Consider Reserved Capacity for consistent workloads
- Implement proper error handling to avoid unnecessary retries



## Cost Optimization Recommendations

### Immediate Actions

- Use HTTP API instead of REST API for API Gateway to reduce costs by ~70%
- Optimize Lambda memory allocation based on actual usage patterns
- Consider provisioned capacity for DynamoDB if usage becomes predictable

### Best Practices

- Monitor CloudWatch metrics to identify optimization opportunities
- Set up billing alerts for cost monitoring
- Use AWS Cost Explorer to track spending trends

## Conclusion

By following the recommendations in this report, you can optimize your Product API Solution costs while maintaining performance and reliability. Regular monitoring and adjustment of your usage patterns will help ensure cost efficiency as your workload evolves.
