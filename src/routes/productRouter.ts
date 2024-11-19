import { Router } from "express";
import ProductController from "../controllers/product.controller";
import multer from "multer";

const multerConfig = multer();
const controller = new ProductController();
const productRouter = Router();

productRouter.get('/products', controller.findAll.bind(controller));
productRouter.get('/products/:id', controller.findById.bind(controller));
productRouter.post('/products', controller.create.bind(controller));
productRouter.post('/products/read-csv', multerConfig.single('file'), controller.readProductsCsv.bind(controller));

export default productRouter;