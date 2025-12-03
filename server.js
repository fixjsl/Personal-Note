import express from 'express'
import mysql   from 'mysql2'
import fs  from 'fs'
import path from 'path'

import RegisterM from './Register.js'
import LoginM from './Login.js'
import DatabaseM from './Database.js'

const app = express()
const Note = './UserNote'

//DB연결
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fixjsl',
    password: 'fixjsl75767@',
    database: 'polygonDefense'
})
connection.connect(err=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Connection complete')
})
DatabaseM.SetDatabase(connection)
//login
app.post('/Login-data',(req,res)=>{
    try{

    }
    catch(err){

    }
})

//Register
app.post('/Register-data',(req,res)=>{
    try{
        //
        RegisterM.regeister(req.body.id,req.body.password,req.body.username,)
    }
    catch(err){

    }

})
//Write Text
app.post('/Write-data',(req,res)=>{
    try{

    }
    catch(err){

    }
})
//Read Text
//app.get()
//글 목록 데이터
//app.get()


app.use(express.static('public'))

app.listen(52272,()=>{
    console.log('Sever is running at http://127.0.0.1:52272')
})