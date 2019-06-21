const {User} = require('../models');
const rabbit = require('../rabbitmq/rabbit');
const schedule = require('node-schedule');
const recive = require('../../recive');


module.exports = async (app) => {
       const total = await User.count({col: 'id'});
       const limit = 500000;
       const status = 'completed';

       const sendData = async (data) => {
          const offset = data / limit;
          for (let index = 0; index < offset; index++) {
            const users = await User.findAll({
                offset: index,
                limit: limit,
                where: {
                  status: null
                },
                order: [['id', 'DESC']] });
              if ( users.length !== 0 ) {
                  await updateStatus(index, users)
              }
          }
       };
       
       const updateStatus = async (index, users) => {
           const nextId = index + 1;
           await rabbit(nextId, users);
           await User.update({
                    status
                },
               {
               fields: [
                   'status',
               ],
               limit: limit,
               offset: index,
               where: {
                   status: null
               }
           })
       };

    await sendData(total)
    recive();
};
