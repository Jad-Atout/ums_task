import blogModel from "../../../db/model/blog.model.js";
import userModel from "../../../db/model/user.model.js";


export const getBlog= async (req, res) => {
    const blog = await blogModel.findAll({
        attributes: ['id', 'title'],
        include:{
            model: userModel,
            attributes:['id','name']
        }
    })
    return res.status(200).json({message:'success',blog})
}

export const createBlog = async (req, res) => {
    const userId = req.id
    const {title,content} = req.body;
    const newBlog = await blogModel.create({ title, content, UserId:userId });
    return res.status(201).json({ message: 'Blog created successfully', newBlog });
}