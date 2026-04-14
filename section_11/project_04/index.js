// Requires
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const conn = require('./db/conn');

// Models
const User = require('./models/User');
const Thought = require('./models/Thought');

// App config
const PORT = 3000;
const app = express();
const hbs = exphbs.create({partialsDir: ['views/partials']});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session config
app.use(session({
  name: 'session',
  secret: 'up4mFukpgaYgrctOTslQTDAa',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function() {},
    path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true
  }
}));

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }
  next();
})

// Routes
const thoughtsRoutes = require('./routes/thoughtsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/thoughts', thoughtsRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => {
  res.redirect('/thoughts');
})

// Database connection + app start
conn
  .sync()
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => console.log(err));
