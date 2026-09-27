const express = require('express')
const http = require('http')
const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const path = require('path')
const rootDir = require('./util/path');
const { pageNotFound } = require('./controllers/errors');
const { default: mongoose } = require('mongoose');
const { authRouter } = require('./routes/authRouter');
const session = require('express-session')
const DB_URL = "mongodb+srv://ukutsavkumaruk_db_user:utsav1311@airbnbv1.3ajox3i.mongodb.net/airbnb"
const MongoDBStore = require('connect-mongodb-session')(session);




const app = express()
const server = http.createServer(app);
const store = new MongoDBStore({
  uri:DB_URL,
  collection:'sessions'
})



app.use(express.urlencoded())
app.use(session({
    secret: 'Airbnb ka auth',
    resave: false,
    saveUninitialized: true,
    store:store,
}));

app.set("view engine",'ejs')
app.set('views','views')


app.use((req, res, next)=>{
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})
app.use(authRouter)
app.use(storeRouter)
app.use('/host',(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect('/login')
  }
})
app.use(hostRouter)

app.use(express.static(path.join(rootDir,'public')))
app.use(pageNotFound)


const PORT = 3000;


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