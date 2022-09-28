const { resourses, User, pets } = require('../../models');

const BaseService = require('../base.service');

const Sequelize = require('sequelize');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('resourses.service.js');


/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage, query, status) =>
  new Promise(async (resolve, reject) => {
    let statusData = status ? (status == 'active' ? false : true) : null;

    var queryFilter = query
      ? { name: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    var condition = { [Sequelize.Op.and]: [queryFilter] };

    let attributes = [
      'id',
      'tittle',
      'image',
      'description',
      "user_id",
      "pets_id"


    ];
    include = [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email"],
      },
      {
        model: pets,
        as: "pets",
      },
    ];
    let responce = await BaseService.paginate(
      resourses,
      page,
      itemPerPage,
      log,
      condition,
      attributes,include
    );
    resolve(responce);
  });

/**
 *
 * @param {*} values
 */
exports.create = (values) =>
  new Promise(async (resolve, reject) => {
    let responce = await BaseService.create(resourses, values, log);
    resolve(responce);
  });

/**
 *
 * @param {*} model
 */
exports.show = (model) =>
  new Promise(async (resolve, reject) => {
    let attributes = [
      'id',
      'tittle',
      'image',
      'description',
      "user_id",
      "pets_id"

    ];
    include = [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email"],
      },
      {
        model: pets,
        as: "pets",
      },
    ];
    let responce = await BaseService.show(resourses, model, log, attributes,include);
    resolve(responce);
  });

/**
 *
 * @param {int} id
 * @param {Object} values
 * @returns{Object}
 */
exports.update = (id, values) =>
  new Promise(async (resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.update(resourses, id, values, log);
    resolve(responce);
  });
/**
 *
 * @param {int} id
 * @returns {String}
 */
exports.delete = (id) =>
  new Promise(async (resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.delete(resourses, id, log);
    resolve(responce);
  });