import { createConnection } from "typeorm";

createConnection({
  name: "default",
  type: `mysql`,
  host: `${process.env.TYPEORM_HOST}`,
  port: parseInt(process.env.TYPEORM_PORT!),
  username: `${process.env.TYPEORM_USERNAME}`,
  password: `${process.env.TYPEORM_PASSWORD}`,
  database: `${process.env.TYPEORM_DATABASE}`,
  entities: ["./src/database/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
});

