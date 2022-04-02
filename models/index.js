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

Income.hasOne(Budget, {
    foreignKey: 'income_id',
    onDelete: 'CASCADE' 
})

Budget.belongsTo(Income, {
    foreignKey: 'income_id'
})


Budget.hasOne(Expense, {
    foreignKey: 'budget_id',
    onDelete: 'CASCADE' 
})

Expense.belongsTo(Budget, {
    foreignKey: 'budget_id'
})