const Center = require('../models/center.model')
const User = require('../models/user.model')

async function createCenter(req, res, next) {
    try {
        req.body.owner = res.locals.user.id
        const center = await Center.create(req.body)
        center.save()
        res.status(200).send({message: 'Center successfully created', data: center})
    } catch (error) {
        next(error)
    }
}

async function getAllCenters(req, res, next) {
    try {
        const centers = await Center.find()
        res.status(200).send(centers)
    } catch (error) {
        next(error)
    }
}

async function getCenter(req, res, next) {
    try {
        const center = await Center.findById(req.params.id)
        res.status(200).send(center)
    } catch (error) {
        next(error)
    }
}

async function updateCenter(req, res, next) {
    try {
        const center = await Center.findById(req.params.id)
            .populate('owner')
        
        if (center.owner.id === res.locals.user.id) {
            for (const param in req.body) {
                if (Object.hasOwnProperty.call(req.body, param)) {
                    const element = req.body[param];
                    center[param] = element                    
                }
            }
            center.save()
            res.status(200).send({message: 'Center successfully updated', data: center})
        } else {
            res.status(500).send({message: 'Unauthorized to perform this action. You are not this center owner.'})
        }

    } catch (error) {
        next(error)
    }
}

async function deleteCenter(req, res, next) {
    try {
        const center = await Center.findById(req.params.id)
            .populate('owner')
        if (center.owner.id === res.locals.user.id) {
            center.delete()
            res.status(200).send({message: 'Center has been deleted'})
        } else {
            res.status(500).send({ message: 'Unauthorized to perform this action. You are not this center owner.' })
        }
    } catch (error) {
        
    }
}

module.exports = {
    createCenter,
    getAllCenters,
    getCenter,
    updateCenter,
    deleteCenter
}