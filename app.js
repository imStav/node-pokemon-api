const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

//Middlewares
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

//Endpoints
// GET /api/pokemons
require('./src/routes/findAllPokemons')(app)

// GET /api/pokemon/id
require('./src/routes/findPokemonByPk')(app)

// POST /api/pokemons
require('./src/routes/createPokemon')(app)

// PUT /api/pokemons/id
require('./src/routes/updatePokemon')(app)

// DELETE /api/pokemons/id
require('./src/routes/deletePokemon')(app)


//Errors management
// 404 - Client side error
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée. Essayez une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))