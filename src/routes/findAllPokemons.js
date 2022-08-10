const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      // 500 - Server side error management
      .catch(error => {
        const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants."
        res.status(500).json({message, data: error})
      })
  })
}