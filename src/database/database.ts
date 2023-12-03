import { Sequelize } from "sequelize"
import config from "../config"
const db = new Sequelize(config.DATABASE.DATABASE, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    dialect: "mysql",
    logging: false
})

export default db