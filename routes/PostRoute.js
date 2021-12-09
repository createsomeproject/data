const express = require('express')
const Router = express.Router()
const PostDb = require('../models/post')


// GET ALL POSTS
Router.get('/', async function(request,response){
    const username = request.query.user
    const categoryName = request.query.category
    try {
        let Post
        if(username){
            Post = await PostDb.find({username})
            
        }
        else if(categoryName){
            Post = await PostDb.find({category : {
                $in : [categoryName]
            }})
        }
        else{
           Post = await PostDb.find()
        }
        response.status(400).json(Post) 
        console.log(username)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message : 'Error'
        })
    }
})

// GET A POST
Router.get('/:id', async function(request,response){
    try {
        const FindPost = await PostDb.findById(request.params.id)
        response.status(400).json(FindPost)

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message : 'Error : No Id Found'
        })
    }
})

// ADD A POST
Router.post('/add', async function (request, response) {
    const NewPost = new PostDb(request.body)
    try {
        const savePost = await NewPost.save()
        response.status(200).json(savePost)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({
            message: 'Error'
        })
    }
})

// UPDATE A POST
Router.put('/edit/:id', async function (request, response) {
    try {
        const Post = await PostDb.findById(request.params.id)
        if (Post.username === request.body.username) {
            try {
                const UpdtatedPost = await PostDb.findByIdAndUpdate(request.params.id, {
                    $set: request.body
                }, {
                    new: true
                })
                response.status(400).json({
                    message : 'You have successfully updated your post'
                })
            } catch (error) {
                console.log(error)
                response.json({
                    message: 'Error'
                })
            }
        }
        else {
            response.status(401).json({
                message: 'You can only update your post'
            })
        }
    }
    catch (error) {
        response.status(401).json({
            message: 'Id does not match with username'
        })
    }
})

// DELETE A POST
Router.delete('/delete/:id', async function (request, response) {
    try {
        const Post = await PostDb.findById(request.params.id)
        if (Post.username === request.body.username) {
            try {
                await Post.delete()
                response.status(500).json({
                    message : 'You have successfully deleted your post'
                })
            } catch (error) {
                console.log(error)
                response.json({
                    message: 'Error'
                })
            }
        }
        else {
            response.status(401).json({
                message: 'You can only delete your post'
            })
        }
    }
    catch (error) {
        response.status(500).json({
            message: 'Id does not match with username'
        })
    }
})

module.exports = Router