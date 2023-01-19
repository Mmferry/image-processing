import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World 🌍 - check our api for rezing images at /resize');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
