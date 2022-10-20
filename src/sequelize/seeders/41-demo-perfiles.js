'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let perfiles = [
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:1,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:2,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:3,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:4,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:5,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:6,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:7,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:8,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
      {
        img:'https://res.cloudinary.com/dwpmiqt1p/image/upload/v1664405673/intranet/default/img-perfil_ryw8yr.jpg',
        estado:'',
        descripcion:'',
        idUsuario:9,
        isNotificacion:true,
        createdAt: '2020-01-01 10:10:10',
        updatedAt: '2020-01-01 10:10:10'
      },
    ]

    return queryInterface.bulkInsert('Perfiles', perfiles, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Perfiles', null, {})
  }
};
