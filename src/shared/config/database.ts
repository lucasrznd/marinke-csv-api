import "dotenv/config";
import { Options } from "sequelize";

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

const config: Options = {
  "username": "user",
  "password": "1234",
  "database": "db_csv",
  "host": "localhost",
  "dialect": "postgres"
}

export = config;