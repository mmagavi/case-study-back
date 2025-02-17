/**
 * Check if the input contains a part ID
 * 
 * @param {*} str the input to check
 * @returns 
 */
export function containsPartId(str) {
    const regex = /PS\d+/

    if (regex.test(str)) {
        const match = str.match(regex)

        console.log("Got part ID: ")
        console.log(match[0])

        return match[0]
    } else {
        return null
    }
}