const db = require('./banco')

const Pessoas = db.sequelize.define(
    'pessoas', {
        nome: {
            type: db.Sequelize.STRING
        },
        endereco: {
            type: db.Sequelize.STRING
        },
        bairro: {
            type: db.Sequelize.STRING
        },
        cep: {
            type: db.Sequelize.STRING
        },
        cidade: {
            type: db.Sequelize.STRING
        },
        estado: {
            type: db.Sequelize.STRING
        }
    }
)

// Pessoas.sync({force: true})

module.exports = Pessoas;