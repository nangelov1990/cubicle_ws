const { cubeModel } = require('../models/index');

function home(req, res, next) {
  cubeModel.find()
    .then(cubes => {
      res.render('index.hbs', { cubes });
    })
    .catch(next);
}

function search(req, res, next) {
  const { search, from, to } = req.body;
  let query = {};
  if (search) {
    query = {
      ...query,
      name: { $regex: search }
    }
  }

  if (to) {
    query = {
      ...query,
      difficultyLevel: { $lte: +to }
    }
  }

  if (from) {
    query = {
      ...query,
      difficultyLevel: { ...query.difficultyLevel, $gte: +from }
    }
  }

  cubeModel.find(query)
    .then(cubes => {
      res.render(
        'index.hbs',
        {
          cubes,
          search,
          from,
          to
        });
    })
    .catch(next);
}

function getCreate(req, res, next) {
  res.render('create.hbs');
}

function postCreate(req, res, next) {
  const { name = null, imageUrl = null, description = null, difficultyLevel = null } =
    req.body;

  cubeModel
    .create({ name, imageUrl, description, difficultyLevel })
    .then(() => {
      res.redirect('/');
    })
    .catch(console.error);
}

function details(req, res, next) {
  const { id } = req.params;

  cubeModel.findById(id)
    .populate('accessories')
    .then(cube => {
      if (!cube) { res.redirect('/not-found'); return; }

      res.render('details.hbs', { cube });
    })
    .catch(next);
}

module.exports = {
  home,
  search,
  getCreate,
  postCreate,
  details
};