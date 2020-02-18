const chai = require('chai');
const sinon = require('sinon');
const knex = require('knex');
const knexfile = require('../../knexfile');

const db = knex(knexfile);

const { expect } = chai;

module.exports = { sinon, expect, db };
