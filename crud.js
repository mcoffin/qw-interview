const express = require('express'); 
const Lazy = require('lazy.js');
const _ = require('lodash');

function isNullOrUndefined(v) {
    return _.isNull(v) || _.isUndefined(v);
};

/**
 * Creates an Express router for crud routes given a function that will create a promise returning all elements
 * in the set
 * @param {function} getElements - Function that returns a promise with the whole collection of elements
 */
exports.crudRouter = function crudRouter(getElements) {
    const app = express.Router();

    // Default route will list all elements in the set
    app.get('/', (req, res) => {
        let matches = getElements()
            .then(Lazy)
            .then(e => e.pairs().map(([k, v]) => v));
        // Here, for every query param, we filter the elements with an equality check (lazily)
        Lazy(req.query).pairs().each(([k, v]) => {
            matches = matches.then(elements => elements.filter(elem => _.get(elem, k) === v));
        });
        matches
            .then(lazyS => lazyS.toArray())
            .then(m => res.json(m));
    });

    // GET route for getting elements by their ID
    app.get('/:id', (req, res) => {
        getElements()
            .then(_.property(req.params['id']))
            .then(prop => {
                if (isNullOrUndefined(prop)) {
                    res.status(404).json({error: `element not found: ${req.params['id']}`});
                } else {
                    res.json(prop);
                }
            });
    });
    return app;
};
