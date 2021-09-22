import Config from '../../../Config.json';

export const db = {
    dbUser: Config.dbUser,
    dbPassword: Config.dbPassword,
    dbServer: Config.dbServer,
    dbDatabase: Config.dbDatabase,
}

export const configuration = {
    port: Config.port,
}
