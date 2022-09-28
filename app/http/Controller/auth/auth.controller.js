const service = require("../../../service/auth/auth.service");

const loginTransformer = require("../../transformer/auth/login.transformer");
const userTransformer = require("../../transformer/auth/user.transformer");

const log4js = require("../../../../config/log4js");
const log = log4js.getLogger("auth.controller.js");

exports.authenticate = (req, res) =>
  service
    .authenticate(req.body)
    .then((doc) => res.json(new loginTransformer(doc)))
    .catch((err) => catchError(res, err, log));

exports.user = async (req, res) =>
  service
    .user(req.headers)
    .then((doc) => res.json(new userTransformer(doc)))
    .catch((err) => catchError(res, err, log));

exports.forgetPassword = async (req, res) =>
  service
    .forgetPassword(req.body.email)
    .then((data) =>
      response.successWithData(
        res,
        `Reset link has been sent to ${req.body.email}`
      )
    )
    .catch((err) => catchError(res, err, log));

exports.changesTempPassword = async (req, res) =>
  service
    .changesTempPassword(req.body)
    .then(async () => {
      let responce = await service.authenticate(
        req.session,
        { username: req.body.username, password: req.body.new_password },
        req.connection.remoteAddress
      );
      res.json(responce);
    })
    .catch((err) => catchError(res, err, log));

exports.changesPassword = async (req, res) =>
  service
    .changesPassword(req.body, req.headers, req)
    .then((doc) => response.successWithData(res, doc))
    .catch((err) => catchError(res, err, log));

exports.user = async (req, res) =>
  service
    .user(req.headers)
    .then((data) =>
      res.json({
        id: data.id,
        name: data.name,
        email: data.email,
        username: data.username,
        role: data.roles[0] ? data.roles[0].name : null,
        permissions: data.roles[0] ? data.roles[0].policies : null,
      })
    )
    .catch((err) => catchError(res, err, log));
