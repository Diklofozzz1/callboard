import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config()

export const generateMD5 = (value) => {
    return crypto.createHash('sha256', process.env.SECRET_KEY).update(value).digest("hex")
}
