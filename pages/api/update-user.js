import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, bio, phone } = req.body;

    //Connect with database
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db();

    const status = await db.collection("users").updateOne(
      {
        email: email,
      },
      {
        $set: {
          name: name,
          bio: bio,
          phone: phone,
        },
      }
    );

    // //Send success response
    res.status(201).json({ message: "User updated", ...status });

    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
