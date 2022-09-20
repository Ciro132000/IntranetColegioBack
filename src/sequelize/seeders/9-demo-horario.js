'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let horarios = [
      {
        horaInicio:'08:00:00',
        horaFinal:'08:45:00',
        dia:1,
        idSeccion:1,
        idCurso:1,
        idAula:1,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        horaInicio:'08:00:00',
        horaFinal:'08:45:00',
        dia:2,
        idSeccion:2,
        idCurso:2,
        idAula:2,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        horaInicio:'08:00:00',
        horaFinal:'08:45:00',
        dia:3,
        idSeccion:3,
        idCurso:3,
        idAula:3,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
    ]

    return queryInterface.bulkInsert('Horarios', horarios, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Horarios', null, {})
  }
};
