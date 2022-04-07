const router = require('express').Router();
const { Budget } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all budgets -- should return all of the user's budget - only that users Auth 
router.get('/', withAuth, async (req, res) => {
  const userId = req.session.user_id
  const budget = await Budget.findAll({
    where: { user_id: userId }
  }).then(result => res.json(result))
});

// Create new Budget
router.post('/', withAuth, async (req, res) => {
  const budgetName = req.body.budget_name;
  const budgetAmount = Number(req.body.budget_amount);
  // const targetDate = req.body.target_date;
  // Error check for budget name 
  if (!budgetName) {
    res.json({ error: "Must provide a budget name" })
    return
  }
  // Error check budget amount
  if (!budgetAmount && typeof budgetAmount !== 'number') {
    res.json({ error: "Must provide a budget amount" })
    return
  }
  if (!req.body.housing || !req.body.insurance || !req.body.transportation || !req.body.food || !req.body.savings || !req.body.utilities || !req.body.personal) {
    res.json({ error: "Must provide a value for all categories" })
    return
  }
  // Error check for target date  TO DO - once we see date format better error checking 
  // if (!targetDate) {
  //   res.send("Error: Must provide a target date")
  //   return
  // }
  await Budget.create({ name: budgetName, housing: req.body.housing, insurance: req.body.insurance, transportation: req.body.transportation, food: req.body.food, savings: req.body.savings, utilities: req.body.utilities, personal: req.body.personal, budgetDate: req.body.date, user_id: req.session.user_id }).then(success => {
    if (success) {
      res.json({ created: true })
    } else {
      res.json({ error: "An error occurred inserting expense" })
    }
  })

});

// GET Budget by Id -- should return individual budgets by id
router.get('/:id', withAuth, async (req, res) => {
  await Budget.findAll({
    where: { id: req.params.id, user_id: req.session.user_id }
  }).then(result => res.json(result))
});

// Update by ID
router.put('/:id', withAuth, async (req, res, next) => {
  const budgetName = req.body.budget_name;
  const budgetAmount = Number(req.body.budget_amount);
  // const targetDate = req.body.target_date;
  // Error check for budget name 
  if (!budgetName) {
    res.json({ error: "Must provide a budget name" })
    return
  }
  // Error check budget amount
  if (!budgetAmount && typeof budgetAmount !== 'number') {
    res.json({ error: "Must provide a budget amount" })
    return
  }
  if (!req.body.housing || !req.body.insurance || !req.body.transportation || !req.body.food || !req.body.savings || !req.body.utilities || !req.body.personal) {
    res.json({ error: "Must provide a value for all categories" })
  }
  // update a category by its `id` value
  await Budget.update({
    name: budgetName, housing: req.body.housing, insurance: req.body.insurance, transportation: req.body.transportation, food: req.body.food, savings: req.body.savings, utilities: req.body.utilities, personal: req.body.personal, budgetDate: req.body.date
  },
    {
      where: { id: req.params.id, user_id: req.session.user_id }
    }).then(result => {
      if (result[0] === 1) {
        res.json({ success: true, salary: req.body.salary })
      } else {
        res.json({ success: false })
      }
    }
    ).catch(err => { console.log(err) })
});

// DELETE by id
router.delete('/:id', withAuth, async (req, res) => {
  // Delete a salary by its `id` value
  await Budget.destroy({
    where: {
      id: req.params.id, user_id: req.session.user_id
    }
  }).then(success => {
    console.log(success)
    if (success === 1) {
      res.json({ deleted: true })
    } else {
      res.json({ deleted: false })
    }
  })
    .catch(console.error("Delete failed"))
});

module.exports = router;