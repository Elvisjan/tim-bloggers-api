import {MongoClient} from 'mongodb';

const mongoUri = process.env.mongoUri || 'mongodb://localhost:27017/';

export const client = new MongoClient(mongoUri);        

export const prodductsCollection =  client.db('products').collection('products'); 

export const runDb = async() =>{
    try {
        await client.connect();
        await client.db('prodducts').command({ping: 1})
    }
    catch {
        console.log('Error connecting to MongoDB');
        await client.close();
    }
}