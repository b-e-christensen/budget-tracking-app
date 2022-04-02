const router = require('express').Router();
// const Income = require('../../models'); ONCE this is real

// GET income that ties to users Auth 
router.get('/', async (req, res) => {
  res.send("TO DO return income")
});

// Create new income
router.post('/', async (req, res) => {
  const salary = Number(req.body.salary);
  // Error check budget amount
  if (!salary && typeof salary !== 'number') {
    res.send("Error: Must provide a numerical income amount")
    return
  }
  // TO DO SQL 
  res.send("ok")
});

// Update by salary ID
router.put('/:id', async (req, res, next) => {
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