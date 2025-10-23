const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const sampleProducts = [
    {
        productId: "PROD-001",
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        brand: "TechBrand",
        price: 99.99,
        description: "High-quality wireless headphones with noise cancellation",
        specifications: {
            batteryLife: "30 hours",
            connectivity: "Bluetooth 5.0",
            weight: "250g"
        }
    },
    {
        productId: "PROD-002",
        name: "Cotton T-Shirt",
        category: "Clothing",
        brand: "FashionCo",
        price: 24.99,
        description: "Comfortable 100% cotton t-shirt",
        specifications: {
            material: "100% Cotton",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Blue"]
        }
    },
    {
        productId: "PROD-003",
        name: "JavaScript Programming Book",
        category: "Books",
        brand: "TechPublisher",
        price: 39.99,
        description: "Complete guide to modern JavaScript programming",
        specifications: {
            pages: 450,
            language: "English",
            format: "Paperback"
        }
    },
    {
        productId: "PROD-004",
        name: "Smartphone",
        category: "Electronics",
        brand: "MobileTech",
        price: 699.99,
        description: "Latest smartphone with advanced camera",
        specifications: {
            storage: "128GB",
            ram: "8GB",
            camera: "48MP",
            battery: "4000mAh"
        }
    },
    {
        productId: "PROD-005",
        name: "Running Shoes",
        category: "Sports",
        brand: "SportsBrand",
        price: 89.99,
        description: "Lightweight running shoes for athletes",
        specifications: {
            material: "Mesh and synthetic",
            weight: "280g",
            sizes: ["7", "8", "9", "10", "11"]
        }
    },
    {
        productId: "PROD-006",
        name: "Coffee Maker",
        category: "Home & Kitchen",
        brand: "KitchenPro",
        price: 129.99,
        description: "Programmable coffee maker with thermal carafe",
        specifications: {
            capacity: "12 cups",
            features: ["Programmable", "Auto shut-off", "Thermal carafe"],
            power: "1200W"
        }
    },
    {
        productId: "PROD-007",
        name: "Gaming Mouse",
        category: "Electronics",
        brand: "GameGear",
        price: 59.99,
        description: "High-precision gaming mouse with RGB lighting",
        specifications: {
            dpi: "16000",
            buttons: 8,
            connectivity: "USB",
            lighting: "RGB"
        }
    },
    {
        productId: "PROD-008",
        name: "Yoga Mat",
        category: "Sports",
        brand: "FitnessPro",
        price: 34.99,
        description: "Non-slip yoga mat for all fitness levels",
        specifications: {
            thickness: "6mm",
            material: "TPE",
            dimensions: "183cm x 61cm"
        }
    },
    {
        productId: "PROD-009",
        name: "Desk Lamp",
        category: "Home & Office",
        brand: "LightCorp",
        price: 45.99,
        description: "LED desk lamp with adjustable brightness",
        specifications: {
            lightType: "LED",
            power: "12W",
            features: ["Dimmable", "Touch control", "USB charging port"]
        }
    },
    {
        productId: "PROD-010",
        name: "Backpack",
        category: "Accessories",
        brand: "TravelGear",
        price: 79.99,
        description: "Durable travel backpack with laptop compartment",
        specifications: {
            capacity: "35L",
            material: "Nylon",
            features: ["Laptop compartment", "Water resistant", "Multiple pockets"]
        }
    }
];

exports.handler = async (event) => {
    try {
        const tableName = process.env.TABLE_NAME;
        
        // Batch write items in chunks of 25 (DynamoDB limit)
        const chunks = [];
        for (let i = 0; i < sampleProducts.length; i += 25) {
            chunks.push(sampleProducts.slice(i, i + 25));
        }

        for (const chunk of chunks) {
            const putRequests = chunk.map(product => ({
                PutRequest: {
                    Item: product
                }
            }));

            const command = new BatchWriteCommand({
                RequestItems: {
                    [tableName]: putRequests
                }
            });

            await docClient.send(command);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Successfully seeded ${sampleProducts.length} products`,
                count: sampleProducts.length
            })
        };
    } catch (error) {
        console.error('Error seeding data:', error);
        
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to seed data',
                message: error.message
            })
        };
    }
};
