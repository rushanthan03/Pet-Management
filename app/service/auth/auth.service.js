const { User, Role, Policy } = require('../../models');

const JWT = require('../../../config/jwt');
const V = require('voca');
const bcrypt = require('bcryptjs');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('auth.controller.js');

/**
 *
 * @param {*} values
 */
exports.authenticate = (values) =>
  new Promise((resolve, reject) => {
    if (!values.email) reject(new Error(`E-mail can't be empty`));
    if (!values.password) reject(new Error(`Password can't be empty`));

    User.findOne({
      where: { email: V.lowerCase(values.email), is_active: true },
    })
      .then((doc) => {
        if (!doc) throw new Error('No User Found');
        const passwordIsValid = bcrypt.compareSync(
          values.password,
          doc.password
        );
        if (!passwordIsValid) reject(new Error(`Invalid password!!`));

        const id = `${doc.id}`;
        const email = `${doc.email}`;

        if (cache.has(id)) {
          const { accessToken, refreshToken } = cache.get(id);
          resolve({ accessToken, refreshToken });
        } else {
          new JWT(doc.email, doc.id).generate(
            (err, accessToken, refreshToken) => {
              if (err) throw err;
              cache.set(id, { accessToken, refreshToken, email }, 43200);
              resolve({ accessToken, refreshToken });
            }
          );
        }
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

exports.user = (headers) =>
  new Promise((resolve, reject) => {
    User.findOne({
      attributes: ['id', 'name', 'email', 'email_verified_at', 'is_active', 'created_at'],
      include: [
        {
            model: Role,
            as: 'roles',
            attributes: ['id', 'name', 'description', 'is_active', 'created_at'],
            include: [
                {
                    model: Policy,
                    as: 'policies',
                    attributes: ['id', 'name', 'group', 'description', 'model', 'action'],
                    through: {
                        attributes: [],
                      }
                }
            ]
        }
    ],
      where: { id: getToken(headers).key },
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

  exports.getPolicies = (headers) => {
    let permissions
     if(headers != null){
         return User.findOne({
           include: [
               {
                   model: Role,
                   as: 'roles',
                   attributes: ['id', 'name'],
                   include: [
                       {
                           model: Policy,
                           as: 'policies',
                           attributes: ['id', 'name'],
                       }
                   ]
               }
           ],
           where: {id: getToken(headers).key}
         })
       .then(result => {
           permissions = result.roles[0]? result.roles[0].policies : null;
           return Promise.resolve(permissions);
       }) 
       .catch(err => { log.error(err); reject(err)});
   }
}
/**
 * @returns {Object}
 */
exports.forgetPassword = (email) => new Promise(async (resolve, reject) => {
  const emailSettings = await siteSettingService.handle();
  const frontEndUrl = emailSettings.url ? emailSettings.url : 'http://localhost:8081'
  if (!email) reject(new Error(`E-mail can't be empty`))
  User
      .findOne({
          where: { email: email}
      })
      .then(doc => {
          if (!doc) throw new Error("User with this email doesn\'t exist");
          new JWT(doc.email, doc.id).forgetPassword((err, token, resetLink) => {
              let url = `${frontEndUrl}${resetLink}`;
              if (err) throw err
              doc.update({ reset_link: token })
              .then(async() => {
                  const isEmailSent = await emailService.senResetPasswordLink(email, url);
                  resolve(isEmailSent)
              })
              .catch(err => {
                  log.error(err)
                  reject(err) 
              })
          })
      })
      .catch(err => {
          log.error(err)
          reject(err)
      })
})
/**
 * 
 * @param {*} data 
 */
 exports.changesTempPassword = (data) => new Promise((resolve, reject) => {
  User
    .findOne({ where: { username: data.username } })
    .then(async doc => {
        if (!doc) throw new Error("No User Found.")
          const ValidPassword = await bcrypt.compareSync(data.temp_password, doc.temp_password);
          if(ValidPassword === false) reject(new Error(`Old password isn't valid`))
          doc.update({
              password: bcrypt.hashSync(data.new_password, 8),
              temp_password: null
          }).then(() => {
              fs.unlinkSync(`${credentialPath}/${doc.id}.txt`)
              resolve('password successfully Updated.')
          })
    })
    .catch(err => {
        log.error(err)
        reject(err)
    })
})

/**
* 
* @param {*} data 
* @param {*} req 
* @param {*} headers 
*/
exports.changesPassword = (data, headers, req) => new Promise((resolve, reject) => {
  const token = getToken(headers)
  const decoded = jwtDecode(token);
  User
    .findByPk(decoded.key)
    .then(async doc => {
        if (!doc) throw new Error("No User Found.")
          const ValidPassword = await bcrypt.compareSync(data.current_password, doc.password);
          if(ValidPassword === false) reject(new Error(`Old password isn't valid`))
          doc.update({
              password: bcrypt.hashSync(data.new_password, 8),
          }, {req: req,  individualHooks: true}).then(resolve('password successfully Updated.'))
    })
    .catch(err => {
        log.error(err)
        reject(err)
    })
})