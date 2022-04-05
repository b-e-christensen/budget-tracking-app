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

User.hasMany(Budget, {
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