const sequelize = require('../config/connection');
const { User, Budget, Income, Expense } = require('../models');

const userData = require('./userData.json');
const budgetData = require('./budgetData.json');
const expenseData = require('./expenseData.json');
const incomeData = require('./incomeData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const budgets = await Budget.bulkCreate(budgetData, {
      returning: true
  })

  const expenses = await Expense.bulkCreate(expenseData, {
    returning: true
})

  const incomes = await Income.bulkCreate(incomeData, {
    returning: true
  })

  process.exit(0);
};

seedDatabase();
