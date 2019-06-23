const faker = require('faker');
const {User} = require('../models');
require('dotenv').config();


const generator = (schema, min = 1, max) => {
    max = max || min
    return Array.from({ length: faker.random.number({ min, max }) }).map(() => Object.keys(schema).reduce((entity, key) => {
        entity[key] = faker.fake(schema[key])
        return entity
    }, {}))
};
const clientsSchema = {
    name: '{{company.companyName}} {{company.companySuffix}}',
    telephone: '{{phone.phoneNumber}}',
    email: '{{internet.email}}'
};

const users = generator(clientsSchema, process.env.USERS, process.env.USERS)

console.time(`time create ${process.env.USERS} records`);
console.log('users records - ', users.length);
console.timeEnd(`time create ${process.env.USERS} records`);

const list = users.map((item) => {
    return {
        id: item.id,
        name: item.name,
        telephone: item.telephone,
        email: item.email
    }
});


try {
    console.time(`time save  ${process.env.USERS} records`);
        User.bulkCreate(list);
    console.timeEnd(`time save  ${process.env.USERS} records`);
} catch (error) {
    console.error(error)
}
