const router = require('express').Router();
const budgetRoutes = require('./budgetRoutes');
const authRoutes = require('./authRoutes');

router.use('/budget', budgetRoutes);
router.use('/auth', authRoutes);

module.exports = router;
