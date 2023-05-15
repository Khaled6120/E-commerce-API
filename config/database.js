const mongoose = require("mongoose")


const dbConnection = () => {
    mongoose.connect(process.env.DB_URI)
        .then((conn) => {
            console.log(`db connected ${conn.connection.host}  `)
        })
    /* .catch((err) => {
         console.error(`DB ERROR ${err}`)
         process.exit(1)
     })*/

}

module.exports = dbConnection