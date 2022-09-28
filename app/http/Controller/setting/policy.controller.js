const service = require('../../../service/setting/policy.service')

const log4js = require('../../../../config/log4js')
const log = log4js.getLogger("policy.controller.js");

/**
 * Display a listing of the resource
 * 
 * @param {*} req 
 * @param {Object} res 
 */
exports.getAll = async (req, res) =>  service.getPolicies()
        .then(doc => response.successWithData(res, doc))
        .catch(err => catchError(res, err, log))

