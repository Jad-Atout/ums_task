import {sequelize} from "../connection.js";
import {DataTypes} from "sequelize";
import userModel from "./user.model.js";
const blogModel = sequelize.define("Blog", {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
userModel.hasMany(blogModel)
blogModel.belongsTo(userModel)
export default blogModel