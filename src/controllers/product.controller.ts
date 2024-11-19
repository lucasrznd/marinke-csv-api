import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
    private service = new ProductService();

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.findAll();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { status, message } = await this.service.findById(Number(id));
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.create(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

    async readProductsCsv(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.readProductsCsv(req.file);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;