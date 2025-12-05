import express from 'express'
import mysql   from 'mysql2'
import fs  from 'fs'
import path from 'path'

import RegisterM from './Register.js'
import LoginM from './Login.js'
import DatabaseM from './Database.js'

const app = express()
const Note = './UserNote'

let LoadPost = 0;

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
app.post('/Id_depuli',(req,res)=>{
    //id 중복 체크
})
app.post('/Register-data',(req,res)=>{
    try{
        //
        RegisterM.regeister(req.body.id,req.body.password,req.body.username,DatabaseM)
    }
    catch(err){

    }

})
app.post('/update/:uid',(req,res) =>{

})
//Write Text
app.post('/Write-data',(req,res)=>{
    try{
        //회원의 개인 포 ㄹ더에  json형태로 저장 
    }
    catch(err){

    }
})
//Read Text
//json 형태의 파일을 html로 변환해서 출력
app.get('/:username/:Postid',(req,res) =>{
    
})
//글 목록 데이터
//글 번호화 제목을 json형태로 반환
app.get('/:Username/',(req,res)=>{
  //메모 50개씩
})


app.use(express.static('public'))

app.listen(52272,()=>{
    console.log('Sever is running at http://127.0.0.1:52272')
})