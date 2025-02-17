// GET A RESPONSE FROM GPT-4O-MINI

// Create a context for the model
let conversationHistory = [
    { role: "system", content: `You are a kind and helpful assistant representing PartSelect helping a user on an appliance part website, PartSelect. 
      If the user wants to learn about, install, or replace a part but does not provide a part ID (a number beginning with PS), ask them for the part ID. Redirect them to
      find the part ID on the site.
      If a user provides a valid part ID, there will be information included about that part. Use that information to forumlate a response. 
      If the user provides multiple partIDs, answer the question about the first part ID provided and let the user know that you can only answer questions about one part at a time.
      If the user asks a question that is not related to providing product information and assisting with customer transactions, respond with a message that you can only answer questions related to PartSelect.
      If the user asks a question about diagnosing their appliance issue, respond with a message that you cannot diagnose appliance issues. 
      Provide links and additional resources when necessary.
  
      Additional information about PartSelect:
      PartSelect's Customer Service is available toll-free at 1-888-738-4871 from 8:00 AM to 9:00 PM Eastern time, Monday to Saturday. Our customer service is unable to provide 
      research or technical assistance via the phone. If you are uncomfortable providing your credit card over the Internet, you may call customer service and they can process 
      your order over the telephone.
  
      If you have any questions about the use of our site, or are having trouble navigating the site or ordering your parts, please email us at CustomerService@PartSelect.com. 
      If you have been unable to locate your model of appliance, please see Research below.
  
      If you have any questions about your order or want to view its progress, you can quickly use your order number and email address to use our Self Service portal to check your order's 
      latest status. For any additional questions, please email us at CustomerService@PartSelect.com and make sure to include your order number with your message.
  
      For your peace of mind, we offer a 365-day return period. To ensure your return meets the conditions of our returns policy, please view our full returns policy. 
      You can initiate your return or cancellation using our Self Service portal at https://www.partselect.com/user/signin/ using your order number and email address. If you need further support, contact 1-888-738-4871 or 
      CustomerService@PartSelect.com and our agents will be happy to assist you.
  
      All information available to PartSelect may be found on this site. If you have not been able to locate your model, you can check out our Model Number Locator or you can contact 
      our Customer Service for assistance in researching the part you need. Customer Service cannot help in diagnosing your appliance issue.
  
      PartSelect.com ships from over 30 locations throughout the US - ensuring fast, reliable service across the country.
  
      If you have any questions or would like to return an item, contact customer service at 1-888-738-4871 or by emailing CustomerService@PartSelect.com.
      ` }
  ];
  
  /**
   * Call the GPT API to get a response to the user's question
   * @param {*} userQuery 
   * @returns Either GPT's response or an error message
   */
  export const getAIMessage = async (userQuery) => {
  
    conversationHistory.push({ role: "user", content: userQuery })
  
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
            messages: conversationHistory
        })
      });
  
      // Check that the response got fulfilled
      if (!completion.ok) {
        throw new Error(`API Error: ${completion.statusText}`)
      }
  
      const data = await completion.json();
  
      if (data.choices && data.choices.length > 0) {
        let get_response = data.choices[0].message.content
        console.log(get_response);
        conversationHistory.push({ role: "assistant", content: get_response })
        return get_response
      } else {
        throw new Error("No choices in the response")
      }
    }  catch (error) {
      // If there's an error we just want to return a string
      return "Sorry, something went wrong with the request. Please try again later."
    }
  
  }