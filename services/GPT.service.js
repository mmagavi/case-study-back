// GET A RESPONSE FROM GPT-4O-MINI
  
  /**
   * Call the GPT API to get a response to the user's question
   * @param {*} userQuery 
   * @returns Either GPT's response or an error message
   */
  export const getAIMessage = async (userQuery, conversationHistory) => {

    // Parse the conversation history from a string
    const parsedConversationHistory = JSON.parse(conversationHistory)
  
    const messages = [
        ...parsedConversationHistory, 
        {role: "user", content: userQuery}
    ]
  
    try {
      // Call the API
      const completion = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: messages
        })
      })

      console.log(completion)
  
      // Check that the response got fulfilled
      if (!completion.ok) {
        console.log("Completion not fulfilled")
        throw new Error(`API Error: ${completion.statusText}`)
      }
  
      const data = await completion.json();
  
      if (data.choices && data.choices.length > 0) {
        let get_response = data.choices[0].message.content
        // console.log(get_response)

        return get_response
      } else {
        throw new Error("No choices in the response")
      }
    }  catch (error) {
      // If there's an error we just want to return a string
      return "Sorry, something went wrong with the request. Please try again later."
    }
  
  }