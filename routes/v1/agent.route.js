const express = require('express')
const agentController = require('../../controllers/agent.controller')

const router = express.Router()

router.route('/:text').get(agentController.response)

module.exports = router