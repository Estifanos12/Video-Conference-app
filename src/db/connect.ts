import { MongoClient } from "mongodb";

import { MONGO_URI, config } from "./config";

export const client = new MongoClient(MONGO_URI);
export const db = client.db();

async function connect() {
  // Use connect method to connect to the server
  await client.connect();

  return "done.";
}

connect().then(console.log).catch(console.error);
