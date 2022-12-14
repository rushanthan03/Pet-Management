const { User, Role } = require('../../models')

const BaseService = require('../base.service')

const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('user.service.js');

/**
 * 
 * @param {*} page 
 * @param {*} itemPerPage 
 * @param {*} query 
 * @param {*} status 
 */
exports.getAll = (page, itemPerPage, query, status) => new Promise(async(resolve, reject) => {
    let statusData = status ? (status == 'active' ? true : false) : null;

    var queryFilter = query ? { name: { [Sequelize.Op.like]: `%${query}%` } } : null;
    var statusFilter = status ? { is_active: statusData } : null;
    var condition = { [Sequelize.Op.and]: [queryFilter, statusFilter] };

    let attributes = ['id', 'name', 'email', 'email_verified_at', 'is_active', 'created_at'];  
    include = [
      {
        model: Role,
        as: 'roles',
        through: {
          attributes:[]
        }
      },
    ]    
    let responce = await BaseService.paginate(User, page, itemPerPage, log,  condition, attributes );
    resolve(responce)


  });

/**
 * 
 * @param {*} values 
 */
 exports.create = (values) =>new Promise(async(resolve, reject) => {
  values.password = bcrypt.hashSync(values.password, 8)
  User.create(values).then(async doc => {
    await doc.addRole(values.roles)
    resolve(doc)
  })
  .catch((err) => { log.error(err); reject(err)});
});

/**
 * 
 * @param {*} model 
 */
exports.show = (model) => new Promise(async(resolve, reject) => {
  let attributes = ['id', 'name', 'email', 'email_verified_at', 'is_active', 'created_at'];
  let include = [
    {
      model: Role,
      as: 'roles',
      attributes: ['id', 'name', 'description', 'created_at', 'is_active'],
      through: {
        attributes: [],
      }
    },
  ]
  let responce = await BaseService.show(User, model, log, attributes);
  resolve(responce)
});

/**
 *
 * @param {int} id
 * @param {Object} values
 * @returns{Object}
 */
 exports.update = (id, values) => new Promise(async(resolve, reject) => {
  values.password = bcrypt.hashSync(values.password, 8)
  if (!id) reject(new Error(`id can't be empty`));
  User.findOne({where: {id: id}})
  .then(async doc => {
    await doc.update(values)
    await doc.setRoles(values.roles)
    resolve(true);
  })
  .catch((err) => { log.error(err); reject(err)});
});

/**
 *
 * @param {int} id
 * @returns {String}
 */
exports.delete = (id) => new Promise(async(resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.delete(User, id, log);
    resolve(responce)
});



/**
 * 
 * @param {*} query 
 * @param {*} except 
 * @param {*} status 
 */
exports.search = (query, except, status) => new Promise( async(resolve, reject) => {
    let statusData = status ? (status == 'active' ? true : null) : null;

    let queryFilter = query ? { name: { [Sequelize.Op.like]: `%${query}%` } } : null;
    let selected = except ? { id: { [Sequelize.Op.not]: JSON.parse(except) } } : null;
    let statusFilter = status ? { is_active: statusData } : null;
    let condition = { [Sequelize.Op.and]: [queryFilter, statusFilter, selected] };

    let attributes = ['id', 'name'];
    let values = await BaseService.search(User, log, condition, attributes);
    resolve(values)
});

/**
 * 
 * @param {*} field 
 * @param {*} value 
 */
 exports.count = (field, value) => new Promise(async (resolve, reject) => {
  let values = await BaseService.count(User, field, value, log);
  resolve(values)
})


/**
*
* @param field
* @param value
* @returns {Promise<unknown>}
*/
exports.find = (field, value) => new Promise(async (resolve, reject) => {
  let values = await BaseService.find(User, field, value, log);
  resolve(values)
})
