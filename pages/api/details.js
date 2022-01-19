import connectDB from "../../../config/connectDB";
import Details from "../../models/detailModel";
import { getSession } from "next-auth/react";

connectDB();

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      await createDetails(req, res);
      break;
    case "GET":
      await getDetails(req, res);
      break;
  }
};

const createDetails = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(500).json({ msg: "invalid authentication!" });
    }

    // console.log(session);
    const { userId } = session;
    const { todo } = req.body;

    if (!todo) res.status(400).json({ msg: "Please add todo." });

    const newTodo = new Details({
      name: todo.toLowerCase(),
      user: userId,
    });

    await newTodo.save();
    res.json({ msg: "Success! Created a new todo" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(500).json({ msg: "invalid authentication!" });
    }

    const { userId } = session;

    const todos = await Todos.find({ user: userId });
    res.json(todos);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default handler;
