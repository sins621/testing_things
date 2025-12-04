import path from 'path'
const __dirname = path.resolve();

export const DB_FILE_NAME = path.join(__dirname, "..", 'db-sqlite', 'local.db')

console.log(DB_FILE_NAME)
