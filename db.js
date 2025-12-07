import bc, { compare } from 'bcrypt'

import mysql   from 'mysql2'
import fs from 'fs/promises'
import path from 'path'
import session from 'express-session'

import mul from 'multer'

import DatabaseM from './Database.js'
import multer from 'multer'

//
 
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

async function passwordhash(password) {
    const hashpassword = await bc.hash(password,salt)
    return hashpassword
}
const password = "fixjsl75767@"
const hash = await passwordhash(password)
console.log(password)
console.log(hash)

const match = await bc.compare(password,hash)
console.log(match)

await DatabaseM.Update("password",usertable,hash,1)