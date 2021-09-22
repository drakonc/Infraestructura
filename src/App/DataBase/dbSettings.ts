import { db } from "../Config/config"

export const dbSettings = {
    user: db.dbUser,
    password: db.dbPassword,
    server: db.dbServer,
    database: db.dbDatabase,
    options: {
        encryptt: true,
        trustServerCertificate: true,
    }
}