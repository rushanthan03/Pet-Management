const service = require('../app/service/auth/auth.service');

exports.validatePermission = (key) => async (req, res, next) => {
  const policies = await service.getPolicies(req.headers);
  const hasPermission = policies.find((policy) => policy.name == key);

  if (hasPermission == undefined) response.unauthorizedError(res);
  else next();
};
