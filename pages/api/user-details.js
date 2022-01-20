import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(500).json({ msg: "invalid authentication!" });
      }

      const { user: email } = session;

      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db();

      const user = await db.collection("users").find({ email: email });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

export default handler;
