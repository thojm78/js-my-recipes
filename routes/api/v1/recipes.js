const router = require('express').Router()

const recipes = require('../../../data/recipes.json')

// GET/api/v1/ - returns id, title, image, prepTime, and difficulty
router.get('/', (request, response) => {
    const found = recipes.map( r => ({
        id: r.id,
        title: r.title,
        image: r.image,
        prepTime: r.prepTime,
        difficulty: r.difficulty
    }))

    response.json(found)
})

// POST/api/v1/recipe/add - add new recipe to array of recipes and return new recipe
router.post('/recipe/add', (request, response) => {
    const { title, image, ingredients, instructions, prepTime, difficulty } = request.body
    
    const id = recipes.length + 1
    recipes.push({ id, title, image, ingredients, instructions, prepTime, difficulty })
    response.json({ id, title, image, ingredients, instructions, prepTime, difficulty })
})

// GET/api/v1/recipe/:id - return full recipe object with specified id
router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id.toString() === id.toString())

    if (found) response.send(found)
    else response.send({ error: {message: `Could not find recipe with id: ${id}`}})
})

module.exports = router