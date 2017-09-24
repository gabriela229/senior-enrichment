const router = require('express').Router();
const { models } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  models.Student.findAll(
    {
      include: {
        model: models.Campus
      }
    })
    .then( students => {
      res.send(students);
    })
    .catch(next);
});

router.get('/:studentId', (req, res, next) => {
  models.Student.findById(req.params.studentId)
    .then( student => {
      res.send(student);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  models.Student.create(req.body)
  .then( student => {
    res.send(student);
  })
  .catch(next);
});

router.put('/:studentId', (req, res, next) => {
  models.Student.findById(req.params.studentId)
    .then( student => {
      student.update(req.body);
    })
    .then( student => {
      res.send(student);
    })
    .catch(next);

});

router.delete('/:studentId', (req, res, next) => {
  models.Student.destroy({where: {id: req.params.studentId}})
    .then( () => {
      res.sendStatus(204);
    })
    .catch(next);

});
