require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');

// Use protected URL to avoid github warnings.
const getMongoDbUrl = () => {
  return process.env.MONGODB_URL;
};
const PORT = process.env.PORT || 3000;
const MONGODB_URL = getMongoDbUrl();
const corsOptions = {
  origin: 'https://br-cse341-node.herokuapp.com/',
  optionsSuccessStatus: 200
};

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f1d7b6b3ab9a55a37442a0')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URL)
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
