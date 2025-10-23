const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

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
        const command = new ScanCommand({
            TableName: process.env.TABLE_NAME
        });

        const result = await docClient.send(command);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                products: result.Items || [],
                count: result.Count || 0
            })
        };
    } catch (error) {
        console.error('Error retrieving products:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: 'Failed to retrieve products'
            })
        };
    }
};
