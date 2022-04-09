const router = require('express').Router();
const { User, Budget, Expense, Income } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        let userData = await User.findByPk(req.session.user_id, {
            
            include: [ { model: Budget }, { model: Expense } ]
        })   
        const user = userData.get({ plain: true });

        res.render('home', {
            user, logged_in: req.session.logged_in
          
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ROUTE FOR PRODUCTION PURPOSES ONLY (easy way to see the breakdown of the data on users being passed)
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            where: { user_id: req.session.user_id },
            include: [ { model: Budget }, { model: Expense }, { model: Income} ]
        })

        res.status(200).json(userData)

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/expenses', withAuth, async (req, res) => {
    try {
    const expenseData = await Expense.findAll({
        where: {
            user_id: req.session.user_id
        }
    })   
    const expenses = expenseData.map((expense) => expense.get({ plain: true }));
    res.render('expenses', {
        expenses
    });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/budget', (req, res) => {
    res.render('budget');
})

router.get('/calendar', (req, res) => {
    res.render('calendar');
})

router.get('/income', (req, res) => {
    res.render('income')
})

router.get('/first-budget', (req, res) => {
    res.render('first-budget')
})


module.exports = router;