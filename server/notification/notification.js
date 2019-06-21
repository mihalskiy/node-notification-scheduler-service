const {User} = require('../models');
const rabbit = require('../rabbitmq/rabbit');

module.exports = async (app) => {
       const total = await User.count({col: 'id'});
       const limit = 500;
       const sendData = async (data) => {
              const offset = data / limit;
              for (let index = 0; index < offset; index++) {
                const users = await User.findAll({ offset: index, limit: limit, order: [['id', 'DESC']] })
                await updateStatus(index, users)
              }   
       };
       
       const updateStatus = async (index, users) => {
           const nextId = index + 1;
           await rabbit(nextId, users);
           await User.update({
               status: 'completed'
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
};
