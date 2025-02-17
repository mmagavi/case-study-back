const express = require('express')
const healthRoute = require('./health.route')
const helloWorldRoute = require('./helloworld.route')
const agentRoute = require('./agent.route')

const router = express.Router()

router.use('/health', healthRoute)
router.use('/', helloWorldRoute)
router.use('/agent', agentRoute)

module.exports = router