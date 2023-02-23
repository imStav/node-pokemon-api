const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    //Request filter
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = "La recherche doit au contenir moins 2 caractères."
        return res.status(400).json({ message })
      }

      return Pokemon.findAndCountAll({ 
        where: { //Sequelize operator WHERE
          name: { // property of the Model Pokemon
            [Op.like]: `%${name}%` // using LIKE operator to filter (similar to SQL LIKE)
          }
        },
        order: ['name'], // Sort names alphabetically
        limit: limit // Limits the request results to the user choice, or 5 max
       })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokémon(s) qui correspondent à la recherce ${name}.`
        res.json({ message, data: rows })
      })
    }
    else {
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      // 500 - Server side error management
      .catch(error => {
        const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({message, data: error})
      })
    }
  })
}