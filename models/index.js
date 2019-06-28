var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://ecuarezma:${process.env.DB_PWD}@jovial-cluster-bd0wc.mongodb.net/Soft_Riders?retryWrites=true&w=majority`, 
{useNewUrlParser: true,
 useCreateIndex: true   
})
.then(() => {
    console.log('connected to db!')
}).catch(err => {
    console.log('ERROR: ', err.message);
})
// mongoose.connect('mongodb://localhost/soft_riders_api', {useNewUrlParser: true});


mongoose.Promise = Promise;

module.exports.Subscriber = require('./subscriber')


