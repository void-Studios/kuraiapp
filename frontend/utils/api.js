const API_URL = "http://api.kuraitachi.com/al/generate_quote";

export const FetchToApi = async (api_url) => {
    try {
        const response  = await fetch(api_url);
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        const jsonResponse = await response.json();
        return jsonResponse;
        } catch (error){
            console.error('Error fetching to API:',error,response);
            throw error;
        }
};

export const getRandomQuote = async () => {
    try {
    const response  = await fetch(API_URL);
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    const jsonResponse = await response.json();
    return jsonResponse.return.quote; 
    } catch (error){
        console.error('Error fetching to API:',error);
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

export const postSubmitTicket = async (titleText,descriptionText,assigneeText) => {
    try {
        console.log(descriptionText);
    } catch (error) {
        console.error("Error submitting ticket:",error);
    }
}