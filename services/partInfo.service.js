import Part from '../models/part.model.js'

/**
 * Get part information by visitng partSelect page for that id
 * 
 * @param {*} part_id 
 * @returns 
 */
export async function getPartInfo(part_id) {
    // Return part information from my locally hosted server.

    // Try to get part information from my mongoDB database
    let my_part = await Part.findOne({ part_id: part_id })

    if (my_part) {
        console.log("Part was already in the database!")
        // console.log(my_part.part_info)
        return my_part.part_info
    }

    // URL to query
    const url = "https%3A%2F%2Fwww.partselect.com%2F" + part_id + "-.htm"

    try {

        let page_content = null;

        // Call scraper API to get the page content
        await fetch(`https://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=${url}&output_format=json&autoparse=true&render=true`)
            .then(response => {
                console.log(response)
                page_content = response
            })
            .catch(error => {
                console.log(error)
            });

        // Get the text from the response body and convert it into a String
        const reader = page_content.body.getReader()
        const decoder = new TextDecoder()

        let done = false
        let text = ''

        while (!done) {
            const { value, done: doneReading } = await reader.read()
            text += decoder.decode(value, { stream: true })
            done = doneReading
        }

        // Create a new entry in the database for this part
        const part = new Part({
            part_id,
            part_info: text
        })

        console.log("Saving part to database")
        await part.save()

        // console.log(text)
        // Return the text from the part page
        return text;

    } catch (error) {
        console.log("Could not get part info: " + error)
        return null
    }

}


/**
 * Function to get all the part IDs from the database
 * @returns logs all part IDs from the database in console
 */
export async function getAllPartIds() {
    try {

        const parts = await Part.find({}, 'part_id')
        const partIDs = parts.map(part => part.part_id)
        console.log('All part IDs:', partIDs)
        return partIds

    } catch (error) {
        console.log('Could not get part IDs')
    }

}