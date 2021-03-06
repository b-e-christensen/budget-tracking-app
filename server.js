const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helmet = require("helmet");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

app.use(helmet.frameguard());

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {sameSite: 'strict'},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
