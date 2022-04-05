const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model { }

// Budget will be a predetermined set percentage of Income. 
Budget.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    housing: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    insurance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transportation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    food: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    savings: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // general utilities along with cell phone bills, subscription services, etc..
    utilities: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // general 'free spending.' going out, buying clothes, travel, entertainment
    personal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
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
        modelName: 'budget',
    }
)

module.exports = Budget;