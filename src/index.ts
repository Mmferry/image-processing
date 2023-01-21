import express, { Application } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(routes);

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
