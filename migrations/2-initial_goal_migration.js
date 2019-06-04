'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "goals", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_goal_migration",
    "created": "2019-06-04T01:45:41.499Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "goals",
        {

        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
