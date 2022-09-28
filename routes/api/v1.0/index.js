const express = require('express');
const router = express.Router();

/**      Auth route         */
router.use('/auth', require('./routers/auth/auth.router'));
/**      End auth route    */

/**      Settings route         */
router.use('/users', require('./routers/setting/user.router'));
router.use('/roles', require('./routers/setting/role.router'));
router.use('/policies', require('./routers/setting/policy.router'));
/**      End settings route    */

/**      categories route         */
router.use('/categories', require('./routers/categories/categories.router'));
/**     End categories route         */

/**      Pets route         */
router.use('/pets', require('./routers/pets/pets.router'));
/**      End Pets route         */

/**      posts route         */
router.use('/posts', require('./routers/posts/posts.router'));
/**      End posts route         */

/**      comments route         */
router.use('/comments', require('./routers/comments/comments.router'));
/**      End comments route         */

/**      resourses route         */
router.use('/resourses', require('./routers/resourses/resourses.router'));
/**      End resourses route         */


module.exports = router;
