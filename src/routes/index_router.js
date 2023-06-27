import { Router } from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import api_router from './api/index.js';
import product_mongo from "./api/products.mongo.js";
import product_router from "./api/products.router.js";

const router = Router();

router.use('/api', api_router);

router.get('/', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});
/* router.get('/products', (req, res) => {
    const filePath = path.resolve('public/html/pages/products.html');
    res.sendFile(filePath);
  }); */
router.get('/products', product_mongo)
export default router;