import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from '../mongoose.js';
import router from '../router.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware para analizar solicitudes JSON con límite de carga útil de 10MB
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());

app.use('/', router);

// app.get('/' , (_ ,res ) => {
//   res.end('Ola klk');
// }) 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app