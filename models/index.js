const Budget = require('./Budget')
const Expense = require('./Expense')
const Income = require('./Income')
const User = require('./User')


User.hasOne(Income, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
}) 

Income.belongsTo(User, {
    foreignKey: 'user_id'
})

// changed to has one to eliminate array in data sent to handlebars. Might be an issue at some point
User.hasOne(Budget, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
})

Budget.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasOne(Expense, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
})

Expense.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    Budget, 
    Expense, 
    Income, 
    User
}