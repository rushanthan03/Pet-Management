const { pets } = require("../../models");

const BaseService = require("../base.service");

const Sequelize = require("sequelize");

const log4js = require("../../../config/log4js");
const log = log4js.getLogger("pets.service.js");

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage, query, status) =>
  new Promise(async (resolve, reject) => {
    let statusData = status ? (status == "active" ? false : true) : null;

    var queryFilter = query
      ? { name: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    var condition = { [Sequelize.Op.and]: [queryFilter] };

    let attributes = [
      "id",
      "name",
      "gender",
      "age",
      "image",
      "weight",
      "cat_code",
      "is_vaccinated",
      "description",
      "additional_info",
      "status",
      "transfer_status",
    ];
    let responce = await BaseService.paginate(
      pets,
      page,
      itemPerPage,
      log,
      condition,
      attributes
    );
    resolve(responce);
  });

/**
 *
 * @param {*} values
 */
exports.create = (values) =>
  new Promise(async (resolve, reject) => {
    let responce = await BaseService.create(pets, values, log);
    resolve(responce);
  });

/**
 *
 * @param {*} model
 */
exports.show = (model) =>
  new Promise(async (resolve, reject) => {
    let attributes = [
      "id",
      "name",
      "gender",
      "age",
      "image",
      "weight",
      "cat_code",
      "is_vaccinated",
      "description",
      "additional_info",
      "status",
      "transfer_status",
    ];
    let responce = await BaseService.show(pets, model, log, attributes);
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
    let responce = await BaseService.update(pets, id, values, log);
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
    let responce = await BaseService.delete(pets, id, log);
    resolve(responce);
  });
