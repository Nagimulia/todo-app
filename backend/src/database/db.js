const mongoose = require('mongoose')

const connectDatabase = async () => { 
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo connection ${connect.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
 }

 module.exports = connectDatabase;