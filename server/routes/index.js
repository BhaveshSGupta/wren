'use strict';

var db = require('../models');

exports.index = function(req, res){
  // db.ExchangePrice.findAll({
  //   include: [ db.Task ]
  // }).success(function(users) {
  //   res.render('index', {
  //     title: 'Express',
  //     users: users
  //   })
  // })

  res.render('index');
};