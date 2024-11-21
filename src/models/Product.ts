import { Model } from "sequelize";
import db from "../shared/models/index";
import sequelize from "sequelize";

class Product extends Model {
    declare id: number;
    declare description: string;
    declare quantity: number;
    declare price: number;
    declare manufacturer: string;
}

Product.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    manufacturer: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: "product",
    underscored: true,
    timestamps: false
});

export default Product;