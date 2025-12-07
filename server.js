import express from 'express'
import mysql   from 'mysql2'
import fs from 'fs/promises'
import path from 'path'
import session from 'express-session'
import bc, { compare } from 'bcrypt'
import mul from 'multer'

import DatabaseM from './Database.js'
import multer from 'multer'

//
const app = express()
const Note = '/UserPost'
const img = '/UserProfile'
const defaultimg = path.join(img,'default.png')
//
const usertable = "user"
const tableatri = ["uid","username","id","password","role"]
//
const salt = 10
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
//암호화 함수

async function passwordhash(password) {
    const hashpassword = await bc.hash(password,salt)
    return hashpassword
}
async function comparepass(reqpassword,hashpassword) {
    const match = await bc.compare(reqpassword,hashpassword)
    return match
}
//세션 설정
app.use(session({
    secret : 'testSession',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 1000*60*60*24,
        httpOnly : true
    }
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const dir = mul.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,img))
    },
    filename:function(req,file,cb){
        const uid = req.session.user.uid
        const png = path.extname(file.originalname)
        cb(null,uid+png)
    }
})
const Filup = mul({
    storage : dir,
    limits : {fileSize: 10* 1024*1024}
})
//login
app.post('/Login-data',async (req,res)=>{
    const id = req.body.id
    const password = req.body.password
    try{
        const result = await DatabaseM.Select(tableatri,usertable,id)
        
        if(result[0].length===0){
            return res.status(404).send("아이디가 없거나 비밀번호가 틀립니다")
            
        }
        else{
            
            if(!await comparepass(password,result[0][0].password)){
             return res.status(404).send("아이디가 없거나 비밀번호가 틀립니다")
             
            }
        }
        const userdata = result[0][0]
        //데이터베이스 userLogin속성 바꾸기
        DatabaseM.Update(true,usertable,"isLogged",id)
        req.session.isLog = true
        req.session.user = {
            uid : userdata.uid,
            username : userdata.username,
            role : userdata.role
        }
        if(userdata.role === 'root'){
            return res.redirect('/RootPage.html')
        }
        else{
                    return res.redirect(`/post/${userdata.username}`)
        }

    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }
})
app.get('/Logout-requset', async (req,res)=>{
    const uid = req.session.user.uid
    req.session.destroy( async err =>{
        await DatabaseM.Update(false,usertable,"isLogged",uid)
        res.redirect('/Login.html')
    })
})
//Register
app.get('/regist/Id_depuli', async (req,res)=>{
    //id 중복 체크
    const userid = req.query.id

    try{
        const result = await DatabaseM.Select([tableatri[2]],usertable,tableatri[2],userid)

        const userdata = result[0]

        if(userdata>0){
            return res.status(409).send("아이디가 중복됨")
        }
        else{
            return res.status(200).send("아이디 사용가능")
        }
    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }
})
app.post('/Register-data',async (req,res)=>{
    const username = req.body.username
    const id = req.body.id
    const password = req.body.password
    try{
        //
        const result = await DatabaseM.Select([tableatri[2]],usertable,tableatri[2],id)

        const userdata = result[0]

        if(userdata.length>0){
            return res.status(409).send("아이디가 중복됨")
        }
        else{
            const passwordhash = await hashpassword(password)
            await DatabaseM.Insert(usertable,[username,id,passwordhash,defaultimg])
            const pathd = path.join(Note,username)
            await fs.mkdir(pathd,{recursive:true})
            res.send("로그인 성공")
            return res.redirect('/Login.html')
        }


    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }

})
app.post('/update-username',async (req,res)=>{
    const uid = req.session.user.uid

    const changeusername = req.body.username
    try {
        await DatabaseM.Update('username',usertable,changeusername,uid)
        return res.status(200).send("닉네임 변경 성공")
    } catch (error) {
        console.log(err)
        throw new Error(err);
    }
})
app.post('/update-password',async (req,res) =>{
    const uid = req.session.user.uid
    const curpassword = req.body.curpassword
    const newpassword = req.body.newpassword
    const ckpassword = req.body.ckpassword
    if(newpassword !== ckpassword){
        res.status(409).send("비밀번호와 확인 비밀번호가 다릅니다")
    }
    
    try{
        const result = await DatabaseM.Select(['uid','password'],usertable,uid)
        const userpass = result[0][0].password
        if(await comparepass(curpassword,userpass)){
            const hashnew = await passwordhash(newpassword)
            await DatabaseM.Update('password',usertable,hashnew,uid)
            return res.status(200).send("비밀번호 변경 성공")
        }
        else{
            return res.status(409).send("현재 비밀번호가 틀립니다")
        }
    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }
})
app.post('/delete-user',async (req,res)=>{
    try {
        const uid = req.session.user.uid
        
        await DatabaseM.Delete(uid,usertable)
        req.session.destroy( async err =>{
            return  res.redirect('/')
    })


        
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
})
//Write Text
app.post('/Write-data',async (req,res)=>{
    const uid = req.session.user.uid
    const title = req.body.title
    const text = req.body.text
  
    try{
        const result = await DatabaseM.Select(["PostNumber"],usertable,uid)
        const postN = result[0][0].PostNumber
        const pathJ = path.join(Note,req.session.user.username,`${postN}.json`)
        //회원의 개인 포 ㄹ더에  json형태로 저장 
        const json = {
            postN: postN+1,
            title : title,
            text : text,
            when : new Date()
        }
        await DatabaseM.Update("PostNumber",usertable,postN+1,uid)
        const jsonS = JSON.stringify(json,null,2)
        await fs.writeFile(pathJ,jsonS,'utf-8')
        return res.redirect(`/post/${req.session.user.username}`)
    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }
})
//Read Text
//json 형태의 파일을 html로 변환해서 출력
app.get('/post/:username/:Postid',(req,res)=>{
    const filep = path.join(__dirname,'public','Post.html')

    res.sendFile(filep,{root : __dirname})
})
app.get('/api/post/:username/:Postid',async (req,res) =>{
    const pathp = path.join(Note,req.params.username,`${req.params.Postid}.json`)

    try {
        const json = await fs.readFile(pathp,'utf-8')
        const postdata = JSON.parse(json)
        return res.json({
            postdata : postdata
        })
    } catch (err) {
                console.log(err)
        throw new Error(err);
    }
})
//글 목록 데이터
//글 번호화 제목을 json형태로 반환
app.get('/post/:username',(req,res)=>{
    const filep = path.join(__dirname,'public','PostList.html')

    res.sendFile(filep,{root : __dirname})
})
app.get('/api/post/:username',async (req,res)=>{
  //메모 50개씩
  const pathd = path.join(__dirname,Note,req.params.username)
  try {
    const filedir = await fs.readdir(pathd)

    let filelist = filedir.filter(name => name.endsWith('.json'))

    filelist.sort((a,b)=>{
        const posta = parseInt(a.replace('.json',''))
        const postb = parseInt(b.replace('.json',''))
        return postb - posta
    })
    const filanlfile = filelist.slice(0,50)

    const postlist = filanlfile.map(async filename =>{
        const filepath = path.join(pathd,filename)

        const filedata = await fs.readFile(filepath,'utf-8')
        const postdata = JSON.parse(filedata)

        return{
            postN : postdata.postN,
            title: postdata.title,
            when : postdata.when
        }

    })
    const fianllist = await Promise.all(postlist)
    return res.json({
        postlist : fianllist
    })

  } catch (err) {
        console.log(err)
        throw new Error(err);
  }
})
//이미지 불러오기
app.get('/api/getimg',async (req,res)=>{
    try{
        const result = await DatabaseM.Select(["img"],usertable,req.session.user.uid)
        if(result[0].length === 0){
            return res.status(404).send("존재하지 않는 유저입니다")
        }
        const imgp = path.join(__dirname,img,result[0][0].img)
        res.sendFile(imgp,{root : __dirname})
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
})
//프로필 이미지 받기
app.post('/profile-img',Filup.single('img'),async (req,res)=>{
    const uid = req.session.user.uid
    const filename = req.file.fieldname

    try {
        await DatabaseM.Update("img",usertable,filename,uid)
        res.redirect(`/userinfo/${req.session.user.username}`)
    } catch (error) {
                console.log(err)
        throw new Error(err);
    }
})
//유저 인포 불러오기
app.get('/:username/userinfo',(req,res)=>{
    const filep = path.join(__dirname,'public','Userinfo.html')

    res.sendFile(filep,{root : __dirname})
})
app.get('/', (req,res) =>{
    try{
        if(req.session && req.session.isLog){
            res.redirect(`/post/${req.session.user.username}`)
        }
        else{
            res.redirect('/Login.html')
        }
    }
    catch(err){
        console.log(err)
        throw new Error(err);
    }
})
app.use(express.static('public'))

app.listen(52272,()=>{
    console.log('Sever is running at http://127.0.0.1:52272')
})