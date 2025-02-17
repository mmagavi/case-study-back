const httpStatus = require('http-status')
const partIDService = require('../services/partID.service.js')
const GPTService = require('../services/GPT.service.js')
const partInfoService = require('../services/partInfo.service.js')

const response = async (req, res, next) => {
    try {
        let {text} = req.params

        console.log(text)

        const result = 'Recieved text: ' + text
        const partID = await partIDService.containsPartId(text)
        // let partInfo = null

        // // If the input specifies a part ID, try to get the part info from the website
        // if (partID) {
        //     partInfo = await partInfoService.getPartInfo(partID)
        //     text += "Part info for the part ID specified: "
        //     text += partInfo
        // }
        // const agentResponse = await GPTService.getAIMessage(text)

        // Create mock responses to test the front end
        const agentResponse = "Mock agent response"
        const partInfo = "Mock partInfoService response"

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