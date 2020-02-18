const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('favorite', (table) => {
        table.bigIncrements('id');
        table.string('userUuid', 200);
        table.string('productId', 200);
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('deletedAt');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('favorite');
};
