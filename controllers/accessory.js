const { accessoryModel, cubeModel } = require('../models/index');

function getCreate(req, res, next) {
  res.render('createAccessory.hbs');
}

function postCreate(req, res, next) {
  const { name = null, imageUrl = null, description = null } =
    req.body;
  accessoryModel.create({ name, imageUrl, description })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
}

function getAttach(req, res, next) {
  const { id } = req.params;

  Promise
    .all([
      cubeModel.findById(id),
      accessoryModel.find({ cubes: { $nin: id}})
    ])
    .then(([cube, filteredAccessories]) => {
      res.render('attachAccessory.hbs', {
        cube,
        accessories: filteredAccessories.length > 0 ?
          filteredAccessories : null
      })
    })
    .catch(next);
}

function postAttach(req, res, next) {
  const { id } = req.params;
  const { accessory } = req.body;

  Promise
    .all([
      cubeModel.updateOne({ _id: id }, { $push: { accessories: accessory } }),
      accessoryModel.updateOne({ _id: accessory }, { $push: { cubes: id } })
    ])
    .then(() => {
      res.redirect('/');
    })
    .catch(next)
}

module.exports = {
  getCreate,
  postCreate,
  getAttach,
  postAttach
}