
const supertest = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const http = require('../../src/http');
const knex = require('knex');
const knexfile = require('../../knexfile');
const db = knex(knexfile);

const should = chai.should();
const request = supertest(http);
const { expect } = chai;

chai.use(chaiHttp);

module.exports = {
  chai, should, request, expect, nock, http, db
};
