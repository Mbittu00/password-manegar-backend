import express from'express'
import cors from'cors'
import mongodb from'./db.js'
import user from'./route/user.js'
import account from'./route/account.js'
//app config's
let app=express()
mongodb()

//middileware
app.use(express.json())
app.use(cors())
//routes
app.use('/api/user',user)
app.use('/api/account',account)
//listen
app.listen(8080,console.log('online'))