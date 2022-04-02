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
    // take in number from user -- asking for a percent. Take the number they input and divide by 100 (couldn't find a percent DataType)
    housing: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    insurance: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    transportation: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    food: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    savings: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    // general utilities along with cell phone bills, subscription services, etc..
    utilities: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    // general 'free spending.' going out, buying clothes, travel, entertainment
    personal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    income_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'income',
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