import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: "*",
    optionsSuccessStatus: 200,
  },
  db: {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT,
  },
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY,
  },
};

export default config;
