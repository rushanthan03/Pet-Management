const { Policy } = require('../../models')

const _ = require('lodash')

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('role.service.js');

/**
 * 
 * @param {*} page 
 * @param {*} itemPerPage 
 * @param {*} query 
 * @param {*} status 
 */
exports.getPolicies = () => new Promise(async(resolve, reject) => {
    Policy.findAll({
        attributes: ["id", "name", "group", "description", "model", "action"],
    })
    .then(doc => {
        let data = _.groupBy(doc, 'group');
        resolve(data);
    })
    .catch(err => { log.error(err);  reject(err) });

  });