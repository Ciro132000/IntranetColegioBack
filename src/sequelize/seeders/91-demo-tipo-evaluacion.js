'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let tipos = [
      {
        tipo:'Examen',
        descripcion:'Esta evaluación va directo a las notas del semestre',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        tipo:'Tarea',
        descripcion:'Esta evaluación es una tarea y se promediara según el docente lo requierea para añadirlo a las notas del semestre',
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      }
    ]

    return queryInterface.bulkInsert('TipoEvaluacions', tipos, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TipoEvaluacions', null, {})
  }
};
