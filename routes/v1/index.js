const express = require('express')
const helloWorldRoute = require('./helloworld.route')
const agentRoute = require('./agent.route')

const router = express.Router()

router.use('/', helloWorldRoute)
router.use('/agent', agentRoute)

module.exports = router