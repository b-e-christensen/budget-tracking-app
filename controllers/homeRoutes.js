const router = require('express').Router();
const { User, Budget, Expense } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        let userData = await User.findByPk(req.session.user_id, {
            
            include: [ { model: Budget }, { model: Expense } ]
        })   
        const user = userData.get({ plain: true });

        res.render('home', {
            user
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ROUTE FOR PRODUCTION PURPOSES ONLY (easy way to see the breakdown of the data on users being passed)
router.get('/user/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [ { model: Budget }, { model: Expense } ]
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

router.get('/expenses', (req, res) => {
    res.render('expenses');
})


module.exports = router;