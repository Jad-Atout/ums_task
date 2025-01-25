import {Sequelize} from "sequelize";
import * as console from "node:console";

export const sequelize = new Sequelize('ums','root','',{
    host: 'localhost',
    dialect:'mysql'
})
export async function createDatabaseConnection(){
   sequelize.sync().
    then(()=>{
        console.log("Database synchronized successfully");
    }).
    catch(err=>{
        console.error(err.message);
    })
}
