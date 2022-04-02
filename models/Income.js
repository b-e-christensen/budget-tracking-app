const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Income extends Model { }

// Create a JS function to interact with Income.salary to extract percentages based off of tax bracket (outside api to deduct state tax as well?)
Income.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // this would calculate Rent/Mortgage, transportation (car payments, insurance), etc.. 
    // necessary_expenses: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // expendable_income: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }, 
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'income',
    }
)

module.exports = Income;