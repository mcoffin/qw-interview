const express = require('express'); 
const Lazy = require('lazy.js');
const _ = require('lodash');

function isNullOrUndefined(v) {
    return _.isNull(v) || _.isUndefined(v);
};

exports.crudRouter = function crudRouter(getElements) {
    const app = express.Router();
    app.get('/', (req, res) => {
        let matches = getElements()
            .then(Lazy)
            .then(e => e.pairs().map(([k, v]) => v));
        Lazy(req.query).pairs().each(([k, v]) => {
            matches = matches.then(elements => elements.filter(elem => _.get(elem, k) === v));
        });
        matches
            .then(lazyS => lazyS.toArray())
            .then(m => res.json(m));
    });
    app.get('/:id', (req, res) => {
        getElements()
            .then(_.property(req.params['id']))
            .then(prop => {
                if (isNullOrUndefined(prop)) {
                    res.status(404).json({error: `Element not found: ${req.params['id']}`});
                } else {
                    res.json(prop);
                }
            });
    });
    return app;
};
