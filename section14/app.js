require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const appEnv = require('./util/app-env');

const MONGODB_URL = appEnv.getMongoDbUrl();
const MONGODB_OPTIONS = appEnv.getMongoDbOptions();
const PORT = appEnv.getServerPort();

const app = express();
const sessionStore = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(cors(appEnv.getCorsOptions()));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    console.log('session.user', null);
    return next();
  }

  console.log('session.user', req.session.user);
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URL, MONGODB_OPTIONS)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Brandon Rock',
          email: 'sandbrock@byui.edu',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}.`);
  })
  .catch((err) => {
    console.log(err);
  });
