const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.route('/').get(userController.allUsers).post(userController.createUsers);
router
  .route('/:id')
  .get(userController.singleUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = router;
