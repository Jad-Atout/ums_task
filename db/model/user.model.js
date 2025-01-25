import {DataTypes} from "sequelize";
import {sequelize} from "../connection.js";

const userModel = sequelize.define("User", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    confirm_email:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    profilePicture:{
        type:DataTypes.STRING,
        allowNull: true
    }
})
export default userModel;