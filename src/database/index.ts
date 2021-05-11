import { createConnection } from "typeorm";
createConnection({
  type: "sqlite",
  database: "./src/database/database.sqlite",
  entities: ["./src/database/entities/**.ts"],
  migrations: ["./src/database/migrations/**.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
});
