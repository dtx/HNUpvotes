/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { items: [{ title: 'Express' }, { title: 'Express2'}]});
};
