
class Register{

constructor(){

}

Check_id(id,database){
//id 중복 검사
//id DB검색
if(database){
    return true
}
else{
    return false
}

}



regeister(id,password,username,database){

if(!this.Check_id(id,database)){
    return "It's already exists"
}
//password 해쉬코드화 작업

//데이터 베이스에 삽입 작업


return true


}





}


const RegisterM = new Register()

export default RegisterM