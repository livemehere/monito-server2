import "dotenv/config";

const config = {
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: "*",
  },
};

export default config;
