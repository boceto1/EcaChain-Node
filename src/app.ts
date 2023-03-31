import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

import ApiRoutes from './routes/index';
import ViewRoutes from './routes/views.routes';

const app = express();

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Setting the view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/* Config routes */
app.use('/api', ApiRoutes);
app.use('', ViewRoutes);

module.exports = app;
