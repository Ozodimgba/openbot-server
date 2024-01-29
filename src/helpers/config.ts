import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SALT;

const config = {
  secret_key: secretKey,
  secret_iv: 'your_secret_iv_here',
  encryption_method: 'aes-256-cbc', // or any other encryption method you prefer
};

export default config;
