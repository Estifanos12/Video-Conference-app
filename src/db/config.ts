export const config = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || "DEMO_PROJECT",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_USERNAME: process.env.DB_USERNAME || "username",
};

export const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`
    : `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`;
