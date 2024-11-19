import { Readable } from "stream";
import IProduct from "../interfaces/IProduct";
import Product from "../models/Product";
import { resp, respM } from "../utils/resp";
import readline from "readline";

class ProductService {

    async findAll() {
        const products = await Product.findAll();
        return resp(200, products);
    }

    async findById(id: number) {
        const product = await Product.findByPk(id);
        return resp(200, product);
    }

    async create(product: IProduct) {
        const newProduct = await Product.create({ ...product });
        return resp(200, newProduct);
    }

    async readProductsCsv(csv: any) {
        if (!csv) {
            return respM(400, "File not provided");
        }
        const { buffer } = csv!;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productsLine = readline.createInterface({
            input: readableFile
        });

        const products: IProduct[] = [];

        for await (let line of productsLine) {
            const productsLineSplit = line.split(",");

            products.push({
                description: productsLineSplit[0],
                quantity: Number(productsLineSplit[1]),
                price: Number(productsLineSplit[2]),
                manufacturer: productsLineSplit[3],
            })
        }

        for await (let { description, quantity, price, manufacturer } of products) {
            const product: IProduct = {description, quantity, price, manufacturer};
            await this.create(product);
        }

        return resp(200, products);
    }

}

export default ProductService;