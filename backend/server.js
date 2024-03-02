import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import mongoose from 'mongoose';

dotenv.config({ path: __dirname + '/.env' });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.DBString, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  app.listen(port, console.log('Server is running on: ', port));
} catch (error) {
  console.log('Server error: ', error);
  process.exit();
}
