var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  models.user.findAll ({}).then (foundUsers => {
    const mappedUsers = foundUsers.map (user =>
      ({
        UserID: user.user_id,
        Name: `${user.first_name} ${user.last_name}`
      }));
  res.send(JSON.stringify(mappedUsers));
});
});
module.exports = router;
