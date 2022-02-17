const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');
const appEnv = require('../util/app-env');

sgMail.setApiKey(appEnv.getSendGridKey());

exports.getLogin = (req, res, next) => {
  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  const flash = req.flash('error');
  const message = flash.length > 0 ? flash[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }

    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            res.redirect('/');
          });
        }
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
      })
      .catch((err) => {
        console.log('err', err);
        res.redirect('/login');
      });
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error', 'E-Mail already exists.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then((result) => {
          res.redirect('/login');
          return sgMail.send({
            to: email,
            from: 'roc20002@byui.edu',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .then((response) => {
          console.log('email statusCode', response[0].statusCode);
          console.log('email headers', response[0].headers);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
