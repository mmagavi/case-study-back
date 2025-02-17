const httpStatus = require('http-status')
const partIDService = require('../services/partID.service.js')
const GPTService = require('../services/GPT.service.js')
const partInfoService = require('../services/partInfo.service.js')
const { get } = require('mongoose')

const response = async (req, res, next) => {
    try {
        let {text, history} = req.params

        const result = 'Recieved text: ' + text
        const partID = await partIDService.containsPartId(text)
        let partInfo = ""

        // If the input specifies a part ID, try to get the part info from the website
        if (partID != null) {

            partInfo = await partInfoService.getPartInfo(partID)

            if (partInfo) {
                text += "\nPart info: "
                text += partInfo
            }
        }

        const agentResponse = await GPTService.getAIMessage(text, history)

        // Create mock responses to test the front end
        // const agentResponse = "Mock agent response"
        // const partInfo = "Mock partInfoService response"

        // If you want to see all part IDs in the database:
        // await partInfoService.getAllPartIds()

        return res.status(httpStatus.OK).json({
            success: true,
            status: httpStatus.OK,
            data: result,
            partID: partID,
            agentResponse: agentResponse,
            partInfo: partInfo
          })

    } catch (err) {
        return next(err)
    }
}

module.exports = {
    response
}