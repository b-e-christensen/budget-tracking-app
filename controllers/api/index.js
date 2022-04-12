const router = require('express').Router();
const budgetRoutes = require('./budgetRoutes');
const authRoutes = require('./authRoutes');
const incomeRoutes = require('./incomeRoutes');
const expenseRoutes = require('./expenseRoutes');
const newsRoutes = require('./newsRoutes')

router.use('/budget', budgetRoutes);
router.use('/auth', authRoutes);
router.use('/income', incomeRoutes);
router.use('/expense', expenseRoutes);
router.use('/news', newsRoutes);

module.exports = router;
