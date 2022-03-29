const router = require('express').Router();
// const Budget = require('../../models'); ONCE this is real

// GET all budgets -- should return all of the user's budget - only that users Auth 
router.get('/', async (req, res) => {
  res.send("TO DO return budget")
});

// Create new Budget
router.post('/', async (req, res) => {
  /* 
  Dev notes to be deleted
  POST JSON looks like 
  {"budget_name": "test3", "budget_amount": "a1", "target_date": 243}
  */
  const budgetName = req.body.budget_name;
  const budgetAmount = Number(req.body.budget_amount);
  const targetDate = req.body.target_date;
  // Error check for budget name 
  if (!budgetName) {
    res.send("Error: Must provide a budget name")
    return
  }
  // Error check budget amount
  if (!budgetAmount && typeof budgetAmount !== 'number') {
    res.send("Error: Must provide a budget amount")
    return
  }
  // Error check for target date  TO DO - once we see date format better error checking 
  if (!targetDate) {
    res.send("Error: Must provide a target date")
    return
  }
  // TO DO SQL 
  res.send("ok")
});

// GET Budget by Id -- should return individual budgets by id
router.get('/:id', async (req, res) => {
  res.send("TO DO return budget by ID")
});

// Update by ID
router.put('/:id', async (req, res, next) => {
  // update a category by its `id` value
  await Budget.update({
    // TO DO
  },
    {
      where: { id: req.params.id }
    }).then(result => res.json({ success: true, updated_name: req.body.category_name })
    ).catch(next)
});

// DELETE by id
router.delete('/:id', async (req, res) => {
  // Delete a budget by its `id` value
  await Budget.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({deleted: true}))
  .catch(console.error("Delete failed"))
});

module.exports = router;