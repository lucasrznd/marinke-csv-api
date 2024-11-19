import request from "supertest";
import express, { Application } from "express";
import multer from "multer";
import ProductController from "../../controllers/product.controller";
import ProductService from "../../services/product.service";

jest.mock("../../services/product.service");

const app: Application = express();
app.use(express.json());
const multerConfig = multer();

const productController = new ProductController();
const serviceMock = ProductService as jest.MockedClass<typeof ProductService>;

// Routes setup
app.get("/products", productController.findAll.bind(productController));
app.get("/products/:id", productController.findById.bind(productController));
app.post("/products", productController.create.bind(productController));
app.post(
    "/read-csv",
    multerConfig.single("file"),
    productController.readProductsCsv.bind(productController)
);

describe("ProductController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /products", () => {
        it("should return a list of products", async () => {
            const mockProducts = [{ id: 1, description: "Product 1" }];
            serviceMock.prototype.findAll.mockResolvedValue({
                status: 200,
                message: mockProducts,
            });

            const response = await request(app).get("/products");

            expect(serviceMock.prototype.findAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });
    });

    describe("GET /products/:id", () => {
        it("should return a product by ID", async () => {
            const mockProduct = { id: 1, description: "Product 1" };
            serviceMock.prototype.findById.mockResolvedValue({
                status: 200,
                message: mockProduct,
            });

            const response = await request(app).get("/products/1");

            expect(serviceMock.prototype.findById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct);
        });

        it("should return 404 if product not found", async () => {
            serviceMock.prototype.findById.mockResolvedValue({
                status: 404,
                message: "Product not found",
            });

            const response = await request(app).get("/products/999");

            expect(serviceMock.prototype.findById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(response.body).toBe("Product not found");
        });
    });

    describe("POST /products", () => {
        it("should create a new product", async () => {
            const newProduct = { description: "Product 1", quantity: 10, price: 15.5, manufacturer: "Company A" };
            const createdProduct = { id: 1, ...newProduct };

            serviceMock.prototype.create.mockResolvedValue({
                status: 200,
                message: createdProduct,
            });

            const response = await request(app).post("/products").send(newProduct);

            expect(serviceMock.prototype.create).toHaveBeenCalledWith(newProduct);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(createdProduct);
        });

        it("should return 400 if required fields are missing", async () => {
            const incompleteProduct = { description: "Product 1" };

            serviceMock.prototype.create.mockRejectedValue({
                status: 400,
                message: "Missing required fields",
            });

            const response = await request(app).post("/products").send(incompleteProduct);

            expect(response.status).toBe(400);
        });
    });

    describe("POST /read-csv", () => {
        it("should process and create products from a CSV file", async () => {
            const csvFile = Buffer.from("Product A,10,15.5,Company A\nProduct B,20,30.0,Company B");
            const mockProducts = [
                { description: "Product A", quantity: 10, price: 15.5, manufacturer: "Company A" },
                { description: "Product B", quantity: 20, price: 30.0, manufacturer: "Company B" },
            ];

            serviceMock.prototype.readProductsCsv.mockResolvedValue({
                status: 200,
                message: mockProducts,
            });

            const response = await request(app)
                .post("/read-csv")
                .attach("file", csvFile, "products.csv");

            expect(serviceMock.prototype.readProductsCsv).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProducts);
        });

        it("should return 400 if no file is provided", async () => {
            serviceMock.prototype.readProductsCsv.mockResolvedValue({
                status: 400,
                message: "File not provided",
            });

            const response = await request(app).post("/read-csv");

            expect(response.status).toBe(400);
            expect(response.body).toBe("File not provided");
        });
    });
});
