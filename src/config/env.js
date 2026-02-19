
import { configDotenv } from "dotenv";

configDotenv();

const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}

export default ENV;
