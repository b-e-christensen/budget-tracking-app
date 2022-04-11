const router = require('express').Router();
const {Expense} = require('../../models');
const withAuth = require('../../utils/auth');

// GET all expenses -- should return all of the user's budget - only that users Auth 
router.get('/', withAuth, async (req, res) => {
  const userId = req.session.user_id
  const expense = await Expense.findAll({ 
    where: { user_id: userId }, 
    order: [ ['expenseDate', 'DESC'] ],
  }).then(result => res.json(result))
});

router.get('/thisMonth', withAuth, async (req, res) => {
  const expense = await Expense.findAll({
    where: { user_id: req.session.user_id }
  })
  let expensesInRange =[]
  for (let i = 0; i < expense.length; i++) {
    const element = expense[i];
    let monthOfExpense = element.expenseDate.toString().split(' ')[1];
    console.log(`month of expense ------>  ${monthOfExpense}`)
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date();
    let currentMonth = month[d.getMonth()];
    console.log(`current month -----> ${currentMonth}`)
    if (monthOfExpense == currentMonth) {
      expensesInRange.push(element)
    }
  }
  res.status(200).json(expensesInRange)
  
})

// Create new Budget
router.post('/', withAuth, async (req, res) => {
  const approvedCategories = ["housing", "insurance", "transportation", "food", "savings", "utilities", "personal"]

  const expenseName = req.body.expense_name;
  const expenseAmount = Number(req.body.expense_amount);
  const categoryReq = req.body.category;
  const expenseDate = req.body.date;
  const category = categoryReq.toLowerCase();
  // const vendor = req.body.vendor;
  // const date = req.body.date;
  // Error check for expense name 
  if (!expenseName) {
    res.json({error: "Must provide a expense name"})
    return
  }
  // Error check expense amount
  if (!expenseAmount && typeof expenseAmount !== 'number') {
    res.json({error: "Must enter a expense amount"})
    return
  }
  // Error check for target date  TO DO - once we see date format better error checking 
   if (!expenseDate) {
     res.json({error: "Must provide a date"})
     return
  }
  if(!category || !(approvedCategories.indexOf(category) > -1)) {
    res.json({error: "Must use a category"})
    return
  }
  await Expense.create({name: expenseName, [category]: expenseAmount, expenseDate: expenseDate, user_id: req.session.user_id}).then(success => {
    if(success){
      res.json({created: true})
    } else {
      res.json({error: "An error occurred inserting expense"})
    }
  })
});

router.get('/date/:startDate/:endDate', async (req, res) => {
  try {
    
    const start = req.params.startDate
    const end = req.params.endDate
      const expenseData = await Expense.findAll({
          where: {
              user_id: req.session.user_id,
            },
            order: [
              ['expenseDate', 'DESC']
          ],
        })
        let startDate = new Date(start)
        let endDate = new Date(end)
    
        let expensesInRange = []
          for (let i = 0; i < expenseData.length; i++) {
              const element = expenseData[i];
              let date = element.expenseDate;
              console.log(date)
              if (date >= startDate && date <= endDate) {
                expensesInRange.push(element)
              }
            }
      res.status(200).json(expensesInRange)

  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
})


// GET expense by Id 
router.get('/:id', withAuth, async (req, res) => {
  await Expense.findAll({ where: { id: req.params.id, user_id: req.session.user_id }
  }).then(result => res.json(result))
});

// Update by ID
router.put('/:id', withAuth, async (req, res) => {
  const approvedCategories = ["housing", "insurance", "transportation", "food", "savings", "utilities", "personal"]
  // update a category by its `id` value
  const expenseName = req.body.expense_name;
  const expenseAmount = Number(req.body.expense_amount);
  const categoryReq = req.body.category;
  const expenseDate = req.body.date;
  const category = categoryReq.toLowerCase();

  if (!expenseName) {
    res.json({error: "Must provide a expense name"})
    return
  }
  // Error check expense amount
  if (!expenseAmount && typeof expenseAmount !== 'number') {
    res.json({error: "Must enter a expense amount"})
    return
  }
  if (!expenseDate) {
    res.json({error: "Must provide a date"})
    return
 }
  if(!category || !(approvedCategories.indexOf(category) > -1)) {
    res.json({error: "Must use a category"})
    return
  }

  await Expense.update({
    housing: null, insurance: null, transportation: null, food: null, savings: null, utilities: null, personal: null, name: expenseName, [category]: expenseAmount, expenseDate: expenseDate
  },
    {
      where: { id: req.params.id, user_id: req.session.user_id }
    }).then(result => { if (result[0] === 1) {
      res.json({ success: true, salary: req.body.salary })
    } else {
      res.json({ success: false})
    }
  }
    ).catch(err => {console.log(err)})
});

// DELETE by id
router.delete('/:id', withAuth, async (req, res) => {
  // Delete a expense by its `id` value
  await Expense.destroy({
    where: {
      id: req.params.id, user_id: req.session.user_id
    }
  }).then(success => {
    console.log(success)
    if(success === 1){
    res.json({deleted: true})
  } else {
    res.json({deleted: false})
  }
  })
  .catch(console.error("Delete failed"))
});

module.exports = router;