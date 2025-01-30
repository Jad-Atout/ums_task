import {Router} from 'express'
import auth from "../authentication/authentication.router.js";
import {createBlog, getBlog} from "./blog.controller.js";

const router = Router()

router.get('/',getBlog)
router.post('/',auth(),createBlog)

export default router