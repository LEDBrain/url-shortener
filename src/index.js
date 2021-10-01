const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    },
});

const indexDB = () => {
    knex.schema.hasTable('redirects').then((exists) => {
        if (!exists) {
            return knex.schema.createTable('redirects', (table) => {
                table.increments('id').primary();
                table.string('shortCode');
                table.string('url');
            });
        }
    });
};

process.on('unhandledRejection', (reason) => {
    if (reason.code === 'ECONNREFUSED') {
        throw new Error(
            'Could not connect to the database! Please check your settings!'
        );
    }
});

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

const app = express();
app.use(limiter);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.status(404).send({ error: 'Invalid!' });
});

app.get('/:short_code', async (req, res, next) => {
    const { short_code: shortCode } = req.params;
    try {
        const dbRecord = await knex('redirects')
            .select('url')
            .where('shortCode', shortCode);
        if (dbRecord[0]) res.redirect(dbRecord[0].url);
        res.status(404);
    } catch (error) {
        res.status(404);
    }
});

app.post('/create', async (req, res, next) => {
    let { short_code_request: shortCode, url } = req.body;
    try {
        shortCode = shortCode ?? nanoid(7).toLowerCase();
        const codeInDB = await knex('redirects')
            .select('*')
            .where('shortCode', shortCode);
        if (codeInDB[0]) throw new Error('short-code already in use!');
        await knex('redirects').insert({ shortCode, url });
        res.json({ shortCode, url });
    } catch (error) {
        error.status = 409;
        next(error);
    }
});

app.use((error, req, res, next) => {
    res.status(error.status ?? 500);
    res.json({
        messsage: error.message,
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    indexDB();
    console.log(`Server started at port ${port}`);
});
