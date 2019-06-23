const {User} = require('../models');
const publisher = require('../rabbitmq/publisher');
const schedule = require('node-schedule');
const consumer = require('../rabbitmq/consumer');
const Op = require('Sequelize').Op;
require('dotenv').config();



module.exports = async (app) => {
    const limit = 500;
    const count = async (status) =>{
        return await User.count({
            col: 'id',
            where: {
                status: status
            },
        });
    };

    const sendData = async (data) => {
      const offset = data / limit;
      const status = 'completed';
        for (let index = 0; index < offset; index++) {
            const users = await User.findAll({
                offset: index,
                limit: limit,
                where: {
                  status: status
                },
                order: [['id', 'DESC']]
            });
            await updateStatus(index, status);
            await publisher(index, users);
            await getMessage();
      }
    };

    const updateStatus = async (index, status) => {
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
               status: {
                   [Op.or]: [null, "completed"]
               },
           },
       });

    };

    const postMessage = async () => {
        const status = null;
        const total = await count(status);
        await sendData(total);
    };


    const getMessage = async () => {
        const status = 'success';
        const total = await count('completed');
        for (let index = 0; index < total / limit; index++) {
            await consumer(index);
            await updateStatus(index, status)
        }
    };


    const j = schedule.scheduleJob({hour: process.env.HOUR, minute: process.env.MINUTE, dayOfWeek: process.env.DAY_OF_WEEK}, async () => {
        await postMessage();
    });

};
