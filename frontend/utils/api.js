const API_BASE_URL = "http://api.kuraitachi.com/al";
const API_URL = "http://api.kuraitachi.com/al/generate_quote";

export const FetchToApi = async (api_url) => {
    try {
        const response  = await fetch(api_url);
        if (!response.ok){
            throw new Error('FetchToApi: Network response was not ok');
        }
        const jsonResponse = await response.json();
        return jsonResponse;
        
        } catch (error){
            console.error('FetchToApi: Error fetching to API:',error);
            throw error;
        }
};

export const getRandomFirstName = async () => { 
    const randomFirstName = await FetchToApi("http://api.kuraitachi.com/al/random_first_name");
    return randomFirstName.return.first_name;
};


export const getRandomLastName = async () => { 
    const randomLastName = await FetchToApi("http://api.kuraitachi.com/al/random_last_name");
    return randomLastName.return.last_name;
};

export const getRandomTitle = async () => { 
    const randomTitle = await FetchToApi("http://api.kuraitachi.com/al/generate_quote?mode=word");
    return randomTitle.return.quote;
};

export const getRandomQuote = async () => { 
    const randomTitle = await FetchToApi("http://api.kuraitachi.com/al/generate_quote?mode=sentence");
    return randomTitle.return.quote;
};

export const postSubmitTicket = async (titleText,descriptionText,assigneeId,emailText) => {
    ticketJson = {
        "title":titleText,
        "description":descriptionText,
        "assignee_id":assigneeId,
        "email":emailText
    };
    postLoad = {
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect : "follow",
        referrerPolicy: "no-referer",
        body: JSON.stringify(ticketJson),
    }
    const api_url = API_BASE_URL + '/submit_ticket';
    
    try {
        const postResponse = await fetch(api_url,postLoad)
        if (!postResponse.ok){
            console.error(api_url);
            console.error(postLoad);
            console.error(postResponse);
            throw new Error('POST Error: ', postResponse.status);
        }
        return await postResponse.json();
    } catch (error) {
        console.error("Error submitting ticket: ",error);
        throw error;
    }
}