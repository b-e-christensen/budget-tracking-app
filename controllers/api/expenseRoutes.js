const router = require('express').Router();
// const Expense = require('../../models'); ONCE this is real

// GET all expenses -- should return all of the user's budget - only that users Auth 
router.get('/', async (req, res) => {
  res.send("TO DO return budget")
});

// Create new Budget
router.post('/', async (req, res) => {
  const expenseName = req.body.expense_name;
  const expenseAmount = Number(req.body.expense_amount);
  const category = req.body.category;
  const vendor = req.body.vendor;
  const date = req.body.date;
  // Error check for expense name 
  if (!expenseName) {
    res.send("Error: Must provide a expense name")
    return
  }
  // Error check expense amount
  if (!expenseAmount && typeof expenseAmount !== 'number') {
    res.send("Error: Must provide a expense amount")
    return
  }
  // Error check for target date  TO DO - once we see date format better error checking 
  if (!targetDate) {
    res.send("Error: Must provide a date")
    return
  }
  // TO DO SQL 
  res.send("ok")
});

// GET expense by Id 
router.get('/:id', async (req, res) => {
  res.send("TO DO return expense by ID")
});

// Update by ID
router.put('/:id', async (req, res, next) => {
  // update a category by its `id` value
  await Expense.update({
    // TO DO
  },
    {
      where: { id: req.params.id }
      // TO DO MORE HERE
    }).then(result => res.json({ success: true})
    ).catch(next)
});

// DELETE by id
router.delete('/:id', async (req, res) => {
  // Delete a expense by its `id` value
  await Budget.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({deleted: true}))
  .catch(console.error("Delete failed"))
});

module.exports = router;