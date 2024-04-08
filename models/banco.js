const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    "avaliacaotap", "root", "", {
        host: "localhost",
        dialect: "mysql"
    }
)

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}