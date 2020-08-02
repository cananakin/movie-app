const mongoose = require('mongoose');

const database = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongodb have connected.');
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = database;