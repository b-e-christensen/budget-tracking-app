const router = require('express').Router();
const {Income} = require('../../models');
const withAuth = require('../../utils/auth');

// GET income that ties to users Auth 
router.get('/', withAuth, async (req, res) => {
  const userId = req.session.user_id
  const income = await Income.findAll({ where: {user_id: userId}
  }).then(result => res.json(result))
  
});

// Create new income
router.post('/', withAuth, async (req, res) => {
  const salary = Number(req.body.salary);
  // Error check budget amount
  if (!salary && typeof salary !== 'number') {
    res.send("Error: Must provide a numerical income amount")
    return
  }
  await Income.create({salary: req.body.salary, user_id: req.session.user_id}).then(res.json({created: true}))
});

// Update by salary ID
router.put('/:id', withAuth, async (req, res, next) => {
  // update a category by its `id` value
  await Income.update({
    // TO DO
  },
    {
      where: { id: req.params.id }
    }).then(result => res.json({ success: true, salary: req.body.salary })
    ).catch(next)
});

// DELETE by id
router.delete('/:id', async (req, res) => {
  // Delete a salary by its `id` value
  await Budget.destroy({
    where: {
      id: req.params.id
    }
  }).then(success => res.json({deleted: true}))
  .catch(console.error("Delete failed"))
});

module.exports = router;