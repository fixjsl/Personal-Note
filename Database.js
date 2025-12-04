class Database{
    constructor(){
        this.Database
    }

    SetDatabase(databse){
        this.Database = databse
    }

    async Select(atri,table,req){
        const query = 'select ?? from ?? where ?? = ?'
        const res = await this.Database.query(query,[atri,table,atri,req])
    }
    async Update(atri, table,update_data,data_id){
        const query = 'update ?? set ??  = ? where uid = ?'
        const res = await this.Database.query(query,[atri,table,update_data,data_id])
    }
    async Delete(atri,table){
        const query = 'delete from ?? where uid = ?'
        const res = await this.Database.query(query,[table,atri])
    }
}



const DatabaseM = new Database()

export default DatabaseM