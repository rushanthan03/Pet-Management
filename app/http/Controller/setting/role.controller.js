const service = require('../../../service/setting/role.service');

const log4js = require('../../../../config/log4js')
const log = log4js.getLogger("role.controller.js");

/**
 * Display a listing of the resource
 * 
 * @param {*} req 
 * @param {Object} res 
 */
exports.getAll = async (req, res) => {
    const {page, size, query, status } = req.query;
    service.getAll(page, size, query, status)
        .then(doc => res.send(doc))
        .catch(err => catchError(res, err, log))
}

/**
 * Display the specified resource.
 *
 * @param {id} req
 * @param {Object} res
 */
exports.create = async (req, res) => {
    const countByName = await service.count( 'name', req.body.name)
        .then((count) => { return count; })
        .catch(() => { return null; })

    if (countByName && countByName != 0) {
        res.status(500).send({ status: 500, error: {name: 'Name already exists.'}})
        return;
    }
    service.create(req.body)
        .then(async (doc) => response.successWithData(res, doc))
        .catch(err => catchError(res, err, log))
}
/**
 * Display the specified resource.
 *
 * @param {id} req
 * @param {Object} res
 */
exports.show = async (req, res) => service.show(req.params.id)
    .then(data => response.successWithData(res, data))
    .catch(err => catchError(res, err, log))

/**
 * Update the specified resource in storage
 *
 * @param {id} req
 * @param {String} res
 */
exports.edit = async (req, res) => {
    const findByName = await service.find( 'name', req.body.name)
      .then((doc) => { return doc; })
      .catch(() => { return null; })

    if ((findByName != null ) && (findByName ? findByName.id  != parseInt(req.params.id) : null)) {
      res.status(500).send({ status: 500, error: {name: 'Name already exists.'}})
      return;
    }
    
    service.update(req.params.id, req.body)
        .then(doc =>  response.successWithBoolean(res, doc))
        .catch(err => catchError(res, err, log))
}
/**
 *  Remove the specified resource from storage.
 * 
 * @param {id} req 
 * @param {String} res 
 */
exports.delete = async (req, res) => service.delete(req.params.id)
    .then(doc =>  response.successWithBoolean(res, doc))
    .catch(err => catchError(res, err, log));

/**
* 
* @param {query} req 
* @param {object} res 
*/
exports.search = async (req, res) => {
    service.search(req.query.query, req.query.except, req.query.status)
        .then(data => response.successWithData(res, data))
        .catch(err => catchError(res, err, log))
}

/**
 * 
 * @param {id} req 
 * @param {string} res 
 */
exports.softDelete = async (req, res) => service.softDelete(req.params.id)
    .then(data =>response.successWithData(res, data))
    .catch(err => catchError(res, err, log));
