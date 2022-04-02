const router = require('express').Router();
const budgetRoutes = require('./budgetRoutes');
const authRoutes = require('./authRoutes');
const incomeRoutes = require('./incomeRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/budget', budgetRoutes);
router.use('/auth', authRoutes);
router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
