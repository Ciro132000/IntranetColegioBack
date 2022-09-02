'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let horarios = [
      {
        horaInicio:'08:00:00',
        horaFinal:'09:30:00',
        dia:1,
        idSeccion:1,
        idCurso:1,
        idAula:1
      },
      {
        horaInicio:'08:00:00',
        horaFinal:'09:30:00',
        dia:2,
        idSeccion:2,
        idCurso:2,
        idAula:2
      },
      {
        horaInicio:'08:00:00',
        horaFinal:'09:30:00',
        dia:3,
        idSeccion:3,
        idCurso:3,
        idAula:3
      },
    ]

    return queryInterface.bulkInsert('Horarios', horarios, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Horarios', null, {})
  }
};
