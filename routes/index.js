var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index', { title: 'node-media-server服务器' });
});

module.exports = router;
