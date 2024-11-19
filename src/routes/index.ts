import { Router } from "express";
import productRouter from "./productRouter";

const router = Router();

router.use(productRouter);

export default router;
