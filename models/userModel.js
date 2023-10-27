const Datastore = require('nedb');
const userDB = new Datastore({ filename: 'db/user.db', corruptAlertThreshold: 1, autoload: true });


// Insert a new document
// const dataToInsert = {
//     name: 'Debs',
//     age: 34,
//     school: 'Agartha International',
//     status: 'married'
// }

// userDB.insert(dataToInsert, (err, data) => {
//     if(err) {
//         return console.log({error: err})
//     }

//     console.log({message: 'data inserted successfully', data});
// })


module.exports = userDB;

