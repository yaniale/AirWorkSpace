const Center = require('../models/center.model')
const User = require('../models/user.model')

async function createCenter(req, res, next) {
    try {
        req.body.owner = res.locals.user.id
        const center = await Center.create(req.body)
        res.status(200).send({message: 'Center successfully created', data: center})
    } catch (error) {
        next(error)
    }
}

async function getAllCenters(req, res, next) {
    try {
        var query = ''
        if (req.query.owner) {
            query = { owner: req.query.owner }
        } else {
            query = {
                $or: [{ name: new RegExp(req.query.query, 'i') },
                    { description: new RegExp(req.query.query, 'i') },
                    { address1: new RegExp(req.query.query, 'i') },
                    { address2: new RegExp(req.query.query, 'i') },
                    { country: new RegExp(req.query.query, 'i') },
                    { city: new RegExp(req.query.query, 'i') }
                    ]
            }
        }
        var search = await Center.find(query)
            .populate('bookings')
            .populate(
                {
                    path: 'bookings',
                    populate: {
                        path: 'customerId',
                        model: 'user'
                    }
                })
        res.status(200).send(search)
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

async function manageAllotment(req, res, next) {
    try {
        const allotment = req.body
        const center = await Center.findById(req.params.id)

        console.log(allotment.hasOwnProperty('idx'))

        if (allotment.hasOwnProperty('idx')) {
            if (allotment.operation === 'U') {
                center.allotment[allotment.idx].quantity += allotment.quantity
                center.save()
                res.status(200).send({message: 'Allotment quantity updated', data: allotment})
            }
            if (allotment.operation === 'D') {
                center.allotment[allotment.idx].status = 'disabled'
                center.save()
                res.status(200).send({message: 'Allotment removed', data: allotment})
            }
        } else {
            center.allotment.push(allotment)
            center.save()
            res.status(200).send({message: 'Allotment added', data: allotment})
        }
    } catch (error) {
        next(error)
    }
}

async function manageRatePlan(req, res, next) {
    try {
        const ratePlan = req.body
        const checkExists = ratePlan.hasOwnProperty('idx')

        const center = await Center.findById(req.params.id)
            .populate('ratePlan')

        if (checkExists) {
            const idx = ratePlan.idx
            if (ratePlan.operation === 'U') {
                for (const param in ratePlan) {
                    if (Object.hasOwnProperty.call(ratePlan, param)) {
                        const element = ratePlan[param];
                        center.ratePlan[idx][param] = element
                    }
                }
                center.save()
                res.status(200).send({message: 'Rate Plan updated', data: center.ratePlan[idx]})
            } else if (ratePlan.operation === 'D') {
                center.ratePlan[idx].status = 'disabled'
                center.save()
                res.status(200).send({message: 'Rate Plan disabled', data: center.ratePlan[idx]})
            }
        } else {
            center.ratePlan.push(ratePlan)
            center.save()
            res.status(200).send({message: 'Rate Plan created', data: center.ratePlan[center.ratePlan.length-1]})
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCenter,
    getAllCenters,
    getCenter,
    updateCenter,
    deleteCenter,
    manageAllotment,
    manageRatePlan
}