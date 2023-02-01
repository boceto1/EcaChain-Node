import express from 'express';
import { join } from 'path';

import { renderIndex } from '../controller/views.controller';

const app = express();

app.set('views', join(__dirname, '../views'));
app.set('layout', './layouts/layout')

app.get('/', renderIndex);

module.exports = app;
