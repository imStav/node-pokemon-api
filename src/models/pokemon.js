//const { get } = require("lodash")
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

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
        //Constraint to handle unicity condition
        unique: {
          msg: "Le nom est déjà pris"
        },
        //Validators to handle errors and inform consumers
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniqument des nombres entiers pour les points de vie." },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          min: {
            args: [0],
            msg: "Les points de vie ne peuvent pas être inférieurs à 0."
          },
          max: {
            args: [999],
            msg: "Les points de vie ne peuvent pas dépasser 999."
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniqument des nombres entiers pour les capacités." },
          notNull: { msg: "Les points de capacités sont une propriété requise." },
          min: {
            args: [1],
            msg: "Les points de capacités ne peuvent pas être inférieurs à 1."
          },
          max: {
            args: [99],
            msg: "Les points de capacités ne peuvent pas dépasser 99."
          }
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
        },
        validate: {
          //Custom validator
          isTypesValid(value) {
            if(!value) {
              throw new Error("Un pokémon doit au moins avoir 1 type.")
            }
            if(value.split(',').length > 3) {
              throw new Error("Un pokémon ne peut pas avoir plus de 3 types.")
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}