const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { nanoid } = require('nanoid');

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
                table.string('redirCode');
                table.string('url');
            });
        }
    });
};

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.status(404).send({ error: 'Invalid!' });
});

app.get('/:id', async (req, res, next) => {
    const { id: redirCode } = req.params;
    try {
        const dbRecord = await knex('redirects')
            .select('url')
            .where('redirCode', redirCode);
        if (dbRecord[0]) res.redirect(dbRecord[0].url);
        res.status(404);
    } catch (error) {
        res.status(404);
    }
});

app.post('/create', async (req, res, next) => {
    let { id: redirCode, url } = req.body;
    try {
        redirCode = redirCode ?? nanoid(7).toLowerCase();
        const codeInDB = await knex('redirects')
            .select('*')
            .where('redirCode', redirCode);
        if (codeInDB[0]) throw new Error('short-code already in use!');
        await knex('redirects').insert({ redirCode, url });
        res.json({ redirCode, url });
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    res.status(error.status ?? 500);
    res.json({
        messsage: error.message,
        stack: error.stack,
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    indexDB();
    console.log(`Server started at port ${port}`);
});
