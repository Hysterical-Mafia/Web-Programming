//API used for importing MMA fights(Includes every main fight organization)
import { MongoClient } from "mongodb";

const connectDB = async () => {
  const url = process.env.DATABASE_URL;
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("mmafightcardsapi-main-db-00d096174c0");
    const collection = db.collection("cards");
    return collection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { connectDB };
