
/**
 * @param {import('knex')} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.bigIncrements('id');
        table.string('name', 50);
        table.string('email', 100);
        table.string('uuid', 200);
        table.string('password', 100);
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('deletedAt');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
