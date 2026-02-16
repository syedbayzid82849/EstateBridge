// scripts/seed-properties.ts
import { MongoClient } from 'mongodb';
import { properties } from '../src/data/properties';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://syedbayzid500_db_user:ywZ8zy7fc4nI7ZRG@cluster0.qgtau53.mongodb.net/estateBridge?appName=Cluster0';

async function seedProperties() {
    const client = new MongoClient(MONGODB_URI);

    try {
        console.log('🔗 Connecting to MongoDB...');
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('estateBridge');
        const collection = db.collection('properties');

        // Clear existing properties (optional)
        const deleteResult = await collection.deleteMany({});
        console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing properties`);

        // Insert new properties
        const propertiesWithMetadata = properties.map(property => ({
            ...property,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'available',
            views: Math.floor(Math.random() * 1000),
        }));

        const result = await collection.insertMany(propertiesWithMetadata);
        console.log(`✅ Inserted ${result.insertedCount} properties`);

        // Create indexes for better search performance
        await collection.createIndex({ city: 1 });
        await collection.createIndex({ type: 1 });
        await collection.createIndex({ propertyType: 1 });
        await collection.createIndex({ price: 1 });
        await collection.createIndex({ featured: 1 });
        console.log('✅ Created indexes');

        console.log('\n📊 Summary:');
        console.log(`Total properties: ${result.insertedCount}`);
        console.log(`For sale: ${properties.filter(p => p.type === 'sale').length}`);
        console.log(`For rent: ${properties.filter(p => p.type === 'rent').length}`);
        console.log(`Featured: ${properties.filter(p => p.featured).length}`);

        // Show sample properties
        console.log('\n🏠 Sample properties:');
        const samples = await collection.find({}).limit(3).toArray();
        samples.forEach((prop: any) => {
            console.log(`  - ${prop.title} (${prop.city}) - $${prop.price.toLocaleString()}`);
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n👋 Connection closed');
    }
}

// Run the seed function
seedProperties();