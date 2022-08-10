//const { get } = require("lodash")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //Validators to handle errors and inform consumers
        validate: {
          isInt: { msg: "Utilisez uniqument des nombres entiers pour les points de vie." },
          notNull: { msg: "Les points de vie sont une propriété requise." }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniqument des nombres entiers pour les capacités." },
          notNull: { msg: "Les points de capacités sont une propriété requise." }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Le lien de l'image doit être une URL valide." },
          notNull: { msg: "L'URL d'image est une propriété requise." }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}