const express = require('express')
const http = require('http')
const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const path = require('path')
const rootDir = require('./util/path');
const { pageNotFound } = require('./controllers/errors');
const { default: mongoose } = require('mongoose');




const app = express()
const server = http.createServer(app);



app.use(express.urlencoded())

app.set("view engine",'ejs')
app.set('views','views')

app.use(storeRouter)
app.use(hostRouter)
app.use(express.static(path.join(rootDir,'public')))
app.use(pageNotFound)


const PORT = 3000;
const DB_URL = "mongodb+srv://ukutsavkumaruk_db_user:utsav1311@airbnbv1.3ajox3i.mongodb.net/airbnb"

mongoose.connect(DB_URL).then(()=>{
console.log("Connection Successful");
server.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})
}
)
.catch(err =>{
  console.log("Error occurs while connection to database.",err)
})