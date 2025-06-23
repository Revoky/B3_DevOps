const express = require('express');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');
const messagesroutes = require('./routes/messageRoutes');
const matchesroutes = require('./routes/matchRoutes');
const swipeRoutes = require('./routes/swipeRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/preferences', preferenceRoutes);
app.use('/', messagesroutes);
app.use('/', matchesroutes);
app.use('/swipes', swipeRoutes);

app.use(errorHandler);

module.exports = app;
