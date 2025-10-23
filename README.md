# Product API - AWS Serverless Solution

A comprehensive serverless product API built with AWS CDK, featuring DynamoDB storage, Lambda functions, and API Gateway integration.

## 🚀 Overview

This project provides a REST API for accessing product specifications with flexible JSON schema support. The solution is built using AWS serverless technologies and follows infrastructure-as-code principles.

### Key Features

- **Serverless Architecture**: Built with AWS Lambda, API Gateway, and DynamoDB
- **Flexible Schema**: JSON-based product data with dynamic attributes
- **RESTful API**: Standard HTTP endpoints for product operations
- **Infrastructure as Code**: Complete AWS CDK implementation
- **Sample Data**: Pre-populated with diverse product categories
- **CORS Support**: Ready for web application integration
- **Comprehensive Testing**: Validated endpoints and error handling

## 📋 API Endpoints

**Base URL**: `https://2j0342qajh.execute-api.us-east-1.amazonaws.com/prod/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Retrieve all products |
| GET | `/products/{id}` | Retrieve specific product by ID |

### Response Format

```json
{
  "success": true,
  "data": {
    "products": [...],
    "count": 10
  }
}
```

## 🏗️ Architecture

```
Client Applications
        ↓
    API Gateway
        ↓
   Lambda Functions
        ↓
     DynamoDB
```

### Components

- **API Gateway**: RESTful API endpoint management
- **Lambda Functions**: Serverless compute for business logic
- **DynamoDB**: NoSQL database for product storage
- **CDK**: Infrastructure deployment and management

## 📁 Project Structure

```
product-api-102320251117/
├── README.md                           # This file
├── DEPLOYMENT_SUMMARY.md               # Deployment status and results
├── task_description.md                 # Original requirements
├── workflow_start_time.txt             # Build timestamp
├── specs/                              # Technical specifications
│   ├── requirements.md                 # Functional requirements
│   ├── design.md                       # Architecture design
│   └── tasks.md                        # Implementation tasks
├── cdk-app/                            # AWS CDK infrastructure
│   ├── lib/                            # CDK stack definitions
│   ├── bin/                            # CDK app entry point
│   ├── test/                           # Infrastructure tests
│   ├── package.json                    # Node.js dependencies
│   └── cdk.json                        # CDK configuration
├── lambda/                             # Lambda function source
│   ├── src/                            # Function implementations
│   │   ├── getProducts.js              # Get all products
│   │   ├── getProductById.js           # Get product by ID
│   │   └── seedData.js                 # Sample data seeding
│   └── package.json                    # Lambda dependencies
├── generated-diagrams/                 # Architecture diagrams
│   ├── product-api-architecture.png    # System architecture
│   ├── product-api-data-flow.png       # Data flow diagram
│   └── product-api-infrastructure.png  # Infrastructure diagram
├── pricing/                            # Cost analysis
│   └── cost-analysis-report.md         # AWS pricing breakdown
├── jira-stories.md                     # User stories
└── jira-story-creation-summary.md      # Story creation log
```

## 🛠️ Technology Stack

- **AWS CDK**: Infrastructure as Code
- **AWS Lambda**: Serverless compute
- **AWS API Gateway**: REST API management
- **AWS DynamoDB**: NoSQL database
- **Node.js**: Runtime environment
- **TypeScript**: CDK development
- **JavaScript**: Lambda functions

## 📊 Sample Data

The API includes 10 pre-populated products across various categories:

- Electronics (Smartphone, Laptop, Headphones)
- Clothing (T-Shirt, Jeans)
- Books (Programming Guide, Novel)
- Sports (Running Shoes)
- Home & Kitchen (Coffee Maker)
- Accessories (Backpack)

Each product includes flexible attributes like name, category, brand, price, description, and category-specific properties.

## 🚀 Deployment

### Prerequisites

- AWS CLI configured
- Node.js 18+ installed
- AWS CDK CLI installed

### Deploy Infrastructure

```bash
cd cdk-app
npm install
cdk deploy
```

### Test API

```bash
# Get all products
curl https://2j0342qajh.execute-api.us-east-1.amazonaws.com/prod/products

# Get specific product
curl https://2j0342qajh.execute-api.us-east-1.amazonaws.com/prod/products/PROD-001
```

## 📈 Cost Analysis

Estimated monthly costs for moderate usage:
- **DynamoDB**: $1.25/month (1M reads, 100K writes)
- **Lambda**: $0.20/month (100K invocations)
- **API Gateway**: $3.50/month (1M requests)
- **Total**: ~$5/month

See [pricing/cost-analysis-report.md](pricing/cost-analysis-report.md) for detailed breakdown.

## 🧪 Testing

The deployment includes comprehensive testing:

1. **Functional Tests**: All endpoints validated
2. **Error Handling**: 404, 400, 500 responses tested
3. **Data Integrity**: DynamoDB data verification
4. **CORS**: Cross-origin request support verified

## 📚 Documentation

- [Requirements](specs/requirements.md) - Detailed functional requirements
- [Design](specs/design.md) - Technical architecture decisions
- [Tasks](specs/tasks.md) - Implementation breakdown
- [Deployment Summary](DEPLOYMENT_SUMMARY.md) - Deployment results
- [Cost Analysis](pricing/cost-analysis-report.md) - AWS pricing breakdown
- [User Stories](jira-stories.md) - Agile development stories

## 🔧 Development

### Local Development

```bash
# Install dependencies
cd lambda && npm install
cd ../cdk-app && npm install

# Run tests
cd cdk-app && npm test

# Deploy changes
cdk diff
cdk deploy
```

### Adding New Endpoints

1. Create Lambda function in `lambda/src/`
2. Add function to CDK stack in `cdk-app/lib/`
3. Configure API Gateway route
4. Deploy with `cdk deploy`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🏷️ Tags

`aws` `serverless` `api` `dynamodb` `lambda` `cdk` `rest-api` `nodejs` `typescript` `infrastructure-as-code`

---

**Built with ❤️ using AWS CDK and serverless technologies**
