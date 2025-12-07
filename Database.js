class Database{
    constructor(){
        this.Database
    }

    SetDatabase(databse){
        this.Database = databse

        this.user_col = ['username','id','password','profile_img']
    }

    async Select(atri,table,req){
        const query = 'select ?? from ?? where uid = ?'
        const res = await this.Database.promise().query(query,[atri,table,req])

        return res
    }
    async Selectid(atri,table,req){
        const query = 'select ?? from ?? where id = ?'
        const res = await this.Database.promise().query(query,[atri,table,req])

        return res
    }
    async Insert(table,value){
        const ph = value.map(()=> '?').join(', ')

        const col = this.user_col.join(', ')

        const query = `insert into ?? (${col}) values(${ph})`

        const res = await this.Database.promise().query(query,[table,...value])
    }
    async Update(atri, table,update_data,data_id){
        const query = 'update ?? set ??  = ? where uid = ?'
        const res = await this.Database.promise().query(query,[table,atri,update_data,data_id])
        return res
    }
    async Delete(atri,table){
        const query = 'delete from ?? where uid = ?'
        const res = await this.Database.promise().query(query,[table,atri])
        return res
    }
}



const DatabaseM = new Database()

export default DatabaseM