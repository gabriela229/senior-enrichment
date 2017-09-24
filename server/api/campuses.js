const router = require('express').Router();
const { models } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  models.Campus.findAll()
    .then( campuses => {
      res.send(campuses);
    })
    .catch(next);
});

router.get('/:campusId', (req, res, next) => {
  models.Campus.findById(req.params.campusId)
    .then( campus => {
      res.send(campus);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  models.Campus.create(req.body)
  .then( campus => {
    res.send(campus);
  });
});

router.put('/:campusId', (req, res, next) => {
  models.Campus.findById(req.params.campusId)
    .then( campus => {
      campus.update(req.body);
    })
    .then( campus => {
      res.send(campus);
    })
    .catch(next);

});

router.delete('/:campusId', (req, res, next) => {
  models.Campus.destroy({where: {id: req.params.campusId}})
    .then( () => {
      res.sendStatus(204);
    })
    .catch(next);

});
