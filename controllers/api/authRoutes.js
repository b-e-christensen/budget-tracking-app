const router = require('express').Router();
const {User}  = require('../../models'); 

// POST handler for user login 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData.email, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout handler 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Register new user handler 
router.post('/register', async (req, res) => {
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const userEmail = req.body.email;
    const password = req.body.password;
    const userName = req.body.user_name;
    // Basic user input validations 
    if(!password || password.length < 8) {
        res.json({error: "Password must be provided and greater then 8 chars"})
        return
    }
    if(!userName || userName.length > 25) {
        res.json({error: "Please provide a name less then 25 characters"})
        return
    }

    const emailChecked = validateEmail(userEmail)
    if(!emailChecked) {
        res.json({error: "Please provide a valid email"})
        return
    }
    // SQL insert 
    await User.create({ username: userName, email: userEmail, password: password }).then(response => res.json({success: true, user_created: userName})).catch(err => res.json({error: true, message: err.message}));

});

module.exports = router;
