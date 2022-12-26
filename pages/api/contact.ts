import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import Message from '../../models/message';

type Data = {
  message: string;
  data?: Message;
};

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
  message: Joi.string().min(10).required(),
});

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    const newMessage: Message = {
      email,
      name,
      message,
    };

    const { error } = schema.validate(newMessage);

    if (error) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ntrwp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', data: newMessage });
  }
}

export default handler;
