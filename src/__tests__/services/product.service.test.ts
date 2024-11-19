import ProductService from "../../services/product.service"; // Adjust the path as needed
import Product from "../../models/Product"; // Mock this model
import { Readable } from "stream";
import readline from "readline";

jest.mock("../../models/Product");

describe("ProductService", () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
        jest.clearAllMocks();
    });

    describe("findAll", () => {
        it("should return all products", async () => {
            const mockProducts = [{ id: 1, description: "Product 1" }];
            (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

            const response = await productService.findAll();

            expect(Product.findAll).toHaveBeenCalled();
            expect(response).toEqual({ status: 200, message: mockProducts });
        });
    });

    describe("findById", () => {
        it("should return the product with the given id", async () => {
            const mockProduct = { id: 1, description: "Product 1" };
            (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

            const response = await productService.findById(1);

            expect(Product.findByPk).toHaveBeenCalledWith(1);
            expect(response).toEqual({ status: 200, message: mockProduct });
        });
    });

    describe("create", () => {
        it("should create and return a new product", async () => {
            const mockProduct = { id: 1, description: "Product 1", quantity: 5, price: 7.10, manufacturer: 'Manufacturer B' };
            (Product.create as jest.Mock).mockResolvedValue(mockProduct);

            const response = await productService.create(mockProduct);

            expect(Product.create).toHaveBeenCalledWith(mockProduct);
            expect(response).toEqual({ status: 200, message: mockProduct });
        });
    });

    describe("readProductsCsv", () => {
        it("should parse the CSV and create products", async () => {
            // Mock CSV data
            const csvBuffer = Buffer.from(`Product A,10,15.5,Company A\nProduct B,20,30.0,Company B`);
            const csvFile = { buffer: csvBuffer };

            // Mock Product.create
            const mockProduct = jest.spyOn(productService, "create").mockResolvedValue({
                status: 200,
                message: {},
            });

            // Mock Readable and readline
            jest.spyOn(Readable.prototype, "push");
            jest.spyOn(readline, "createInterface").mockImplementation((): any => {
                const mockInterface = {
                    [Symbol.asyncIterator]: async function* () {
                        yield "Product A,10,15.5,Company A";
                        yield "Product B,20,30.0,Company B";
                    },
                };
                return mockInterface;
            });

            const response = await productService.readProductsCsv(csvFile);

            expect(mockProduct).toHaveBeenCalledTimes(2); 
            expect(response).toEqual({
                status: 200,
                message: [
                    {
                        description: "Product A",
                        quantity: 10,
                        price: 15.5,
                        manufacturer: "Company A",
                    },
                    {
                        description: "Product B",
                        quantity: 20,
                        price: 30.0,
                        manufacturer: "Company B",
                    },
                ],
            });
        });

        it("should return an error if no CSV is provided", async () => {
            const response = await productService.readProductsCsv(null);

            expect(response).toEqual({
                status: 400,
                message: {
                    message: "File not provided",
                },
            });
        });
    });
});
