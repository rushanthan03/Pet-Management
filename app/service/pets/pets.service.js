const { pets, User, categories } = require("../../models");

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
      "user_id",
      "categories_id",
    ];
    include = [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email"],
      },
      {
        model: categories,
        as: "categories",
        attributes: ["id","categroy"],
      },
    ];
    let responce = await BaseService.paginate(
      pets,
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
      "user_id",
      "categories_id",
    ];
    include = [
      {
        model: User,
        as: "users",
        attributes: ["id", "name", "email"],
      },
      {
        model: categories,
        as: "categories",
        attributes: ["id", "categroy"],
      },
    ];
    let responce = await BaseService.show(pets, model, log, attributes, include);
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

  /**
 *
 * @param id
 * @param data
 * @returns {Promise<unknown>}
 */
exports.imageUpload = (id, data) => new Promise(async (resolve, reject) => {
  if (!id) reject(new Error(`id can't be empty`));
  let file;
  let value;

  if (data == null) file = null
  else file = data.image

  if (file != null) {
    let extension = path.extname(file.name);
    if (extension == "") extension = ".jpg";
    let fileName = `${id}${extension}`;
    let filePath = path.join(`${imagePath}/${fileName}`);

    if ((await fs.existsSync(imagePath)) === false) {
      await fs.mkdirSync(imagePath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    await file.mv(filePath);
    value = fileName
  }else {
    value = null
  }

pets.update({ image: value,}, { where: { id: id } }, { individualHooks: true })
  .then( resolve("Pet Image Successfully added."))
  .catch((err) => { log.error(err); reject(err)});

});