class Database{
    constructor(){
        this.Database
    }

    SetDatabase(databse){
        this.Database = databse

        this.user_col = ['username','id','password','profile_img']
    }

    async Select(conn,atri,table,req){
        const query = 'select ?? from ?? where uid = ?'
        const res = await conn.query(query,[atri,table,req])

        return res
    }
    async Selectid(conn,atri,table,req){
        const query = 'select ?? from ?? where id = ?'
        const res = await conn.query(query,[atri,table,req])

        return res
    }
    async Selectt(conn,atri,table){
        const query = 'select ?? from ?? '
        const res = await conn.query(query,[atri,table])

        return res
    }
    async Insert(conn,table,value){
        const ph = value.map(()=> '?').join(', ')

        const col = this.user_col.join(', ')

        const query = `insert into ?? (${col}) values(${ph})`

        const res = await conn.query(query,[table,...value])
    }
    async Update(conn,atri, table,update_data,data_id){
        
        const query = 'update ?? set ??  = ? where uid = ?'
        const res = await conn.query(query,[table,atri,update_data,data_id])

        return res
    }
    async Delete(conn,atri,table){
        const query = 'delete from ?? where uid = ?'
        const res = await conn.query(query,[table,atri])
        return res
    }
}



const DatabaseM = new Database()

export default DatabaseM