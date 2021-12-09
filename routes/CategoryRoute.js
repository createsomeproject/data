const express = require('express')
const Router = express.Router()
const CategoryDb = require('../models/category')

Router.post('/add', async function(request,response){
    const NewCategory = new CategoryDb(request.body) 
    try {
        const SavedCategory = await NewCategory.save()
        response.status(200).json(SavedCategory)
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message : 'Error'
        })
    }
})
module.exports = Router