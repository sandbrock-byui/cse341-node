const bodyParser = require('body-parser');
const express = require('express');
//const expressHbs = require('express-handlebars');
const path = require('path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// app.engine(
//   'hbs',
//   expressHbs.engine({ defaultLayout: 'main-layout', extname: 'hbs' })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
