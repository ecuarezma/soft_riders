var mongoose = require("mongoose");
mongoose.set("debug", true);

const password = process.env.DB_DEV_PWD;
const uri = `mongodb+srv://dev_admin:${password}@cluster0-0wjpt.mongodb.net/test?retryWrites=true&w=majority`;
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
