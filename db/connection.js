import {Sequelize} from "sequelize";
export const sequelize = new Sequelize('ums','root','',{
    host: 'localhost',
    dialect:'mysql'
})
export async function createDatabaseConnection(){
   sequelize.sync({force:false}).
    then(()=>{
        console.log("Database synchronized successfully");
    }).
    catch(err=>{
        console.error(err.message);
    })
}
