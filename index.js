const express = require('express');
const fs = require('fs');
const util = require('util');
const Lazy = require('lazy.js');
const config = require('./config');
const { crudRouter } = require('./crud');

class DataSource {
    constructor(filename) {
        this.raw = util.promisify(fs.readFile)(filename).then(JSON.parse);
    }

    get data() {
        return this.raw.then(elements => Lazy(elements).map(v => [v.id.toString(), v]).toObject());
    }
}

const app = express();
const dataSource = new DataSource(config.dataFile);

app.use('/leads', crudRouter(() => dataSource.data));

app.listen(config['bind-port'], config['bind-address']);
