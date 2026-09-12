const express = require('express')
const http = require('http')
const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const path = require('path')
const rootDir = require('./util/path');
const { pageNotFound } = require('./controllers/errors');
const db = require('./util/databaseSQL')
db.execute('SELECT * FROM homes')
.then(result => {
  console.log('Getting from DB : ', result)
})
.catch(err =>{
  console.log("Error while fetching DB :",err)
})

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
 server.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
 })