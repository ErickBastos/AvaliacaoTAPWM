const express = require('express')
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')

const app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))

app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const pessoas = require('./models/pessoas')


app.get('/', function(req, res){
    res.render('cadastro')
})

app.post('/cadastrar', function(req, res){
    pessoas.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    })
    .then(function(){
        res.redirect('/consulta')
    })
    .catch(function(erro){
        console.log("Erro ao cadastrar: " + erro)
    })
})

app.get('/consulta', function(req, res){
    pessoas.findAll()
    .then(function(pessoas){
        res.render('consulta', {pessoas})
    })
    .catch(function(erro){
        console.log("Erro ao consultar: " + erro)
    })
})

app.get('/editar/:id', function(req, res){
    pessoas.findAll(
        {
            where: {
                'id': req.params.id
            }
        })
        .then(function(pessoas){
            res.render('editar', {pessoas})
        })
        .catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.post('/atualizar', function(req, res){
    pessoas.update({
        nome: req.body.nome,
        idade: req.body.idade,
        endereco: req.body.endereco,
    },
    {
        where: {
            id: req.body.id
        }
    })
    .then(function(){
        res.redirect('/consulta')
    })
})

app.get('/excluir/:id', function(req, res){
    pessoas.destroy(
        {
            where: {
                'id': req.params.id
            }
        }
    )
    .then(function(){
        res.render('cadastro')
    })
    .catch(function(erro){
        console.log("Erro ao excluir: " + erro)
    })
})

app.listen(8081, function(){
    console.log("Servidor iniciado")
})