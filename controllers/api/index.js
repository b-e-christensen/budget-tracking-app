const router = require('express').Router();
const budgetRoutes = require('./budgetRoutes');

router.use('/budget', budgetRoutes);

module.exports = router;
