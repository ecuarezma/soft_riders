var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "Please enter a first name!"
    },
    lastName: {
        type: String,
        required: "Please enter a last name!"
    },
    email: {
        type: String,
        unique: true,
        required: "Please enter valid email!"
    },
    location: {
        type: String,
        required: "Please enter location!"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Subscriber.create({
//     firstName: " ",
//     lastName: " ",
//     email: " ",
//     location: " "
// }).then(newData => {
//     console.log(newData)
// }).catch(err => {
//     console.log(err)
// })

module.exports = Subscriber;