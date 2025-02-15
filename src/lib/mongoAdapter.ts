import { MongoClient } from 'mongodb';

// Extend the global object to include the _mongoClientPromise property
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Create a new MongoClient instance
const client = new MongoClient(process.env.MONGODB_URI as string);
let clientPromise: Promise<MongoClient>;

// Check if the promise already exists to avoid reinitializing
if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise;

export default clientPromise;
