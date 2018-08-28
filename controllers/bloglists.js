const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}


blogsRouter.get('/', (req,res) => {
    Blog
    .find({})
    .then(blogs => {
        res.json(blogs.map(formatBlog))
    })
})

blogsRouter.get('/:id', (req,res) => {
    Blog
    .findById(req.params.id)
    .then(blog => {
        if (blog) {
            res.json(formatBlog(blog))

        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        res.status(400).send({error: 'malformatted id'})
    })
})

blogsRouter.delete('/:id',(req,res) => {
    Blog
    .findByIdAndRemove(req.params.id)
    .then(result => {
        console.log(result)
        res.status(204).end()
    })
    .catch(error => {
        res.status(400).send({error: 'malformatted id' })
    })
})

blogsRouter.post('/', (req,res) => {
    const body = req.body

    if (body.title === undefined) {
        res.status(400).json({error: 'content missing'})
    } 

 const blog = new Blog(req.body)

        blog
        .save() 
        .then(result => {
          return formatBlog(result)
        
        }) 
        .then(formattedBlog => {
            res.json(formattedBlog)
        })        
})

module.exports = blogsRouter