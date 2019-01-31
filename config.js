// Dependencies
const Lazy = require('lazy.js');

// Minimist arg parsing config
const argv = require('minimist')(process.argv.slice(2), {
    string: [
        "data-file",
        "bind-address"
    ],
    alias: {
        "data-file": ["f"],
        "bind-port": ["p"]
    },
    default: {
        "data-file": "auto.leads.json",
        "bind-address": "localhost",
        "bind-port": 8080
    }
});

/**
 * Simple wrapper for the args object for easy getter methods
 */
class Config {
    constructor(args) {
        Lazy(args)
            .pairs()
            .each(([k, v]) => {
                this[k] = v;
            });
    }

    /**
     * Alias getter for the `data-file` config argument
     */
    get dataFile() {
        return this["data-file"];
    }
};

module.exports = new Config(argv);
