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
    models.Student.findOne(
      {
        where: {
          id: student.id
        },
        include: {
          model: models.Campus
        }
      })
      .then( newStudent => {
        res.send(newStudent);
      })
      .catch(next);
    })
});

router.put('/:studentId', (req, res, next) => {
  models.Student.findById(req.params.studentId)
    .then( student => {
      return student.update(req.body);
    })
    .then( updatedStudent => {
      return models.Student.findOne(
        {
          where: {
            id: updatedStudent.id
          },
          include: {
            model: models.Campus
          }
        })
    })
    .then( studentWithCampus => {
      res.send(studentWithCampus);
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
