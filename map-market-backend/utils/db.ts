import { createPool } from "mysql2/promise";

// yeah 'easy' password but I am aware that in normal case I shouldn't be pushing it with password

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "map-market",
  namedPlaceholders: true,
  decimalNumbers: true,
});
