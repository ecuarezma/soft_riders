var mongoose = require("mongoose");
mongoose.set("debug", true);

const pswd = process.env.DB_PWD;
const password = process.env.DB_DEV_PWD;
const uri = `mongodb+srv://ecuarezma:${pswd}@jovial-cluster-bd0wc.mongodb.net/test?retryWrites=true&w=majority`;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: "Soft_Riders"
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("connected to db!");
  })
  .catch(err => {
    console.log("ERROR: ", err.message);
  });

mongoose.Promise = Promise;

module.exports.Subscriber = require("./subscriber");
