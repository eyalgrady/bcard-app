import axios from "axios"

// export const api = axios.create({
//     baseURL: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2`
// })

export const getCards = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

export const getCardById = async (apiURL, card_id) => {
    const response = await axios.get(`${apiURL}/${card_id}`);
    return response.data;
};

export const createCard = async (apiURL, cardData) => {
    const token = localStorage.getItem('x-auth-token');
    const response = await axios.post(apiURL, cardData, {
        headers: {
            'x-auth-token': token
        }
    });
    return response.data;
};

export const updateCard = async (apiURL, card_id, card) => {
    const token = localStorage.getItem('x-auth-token');
    axios.defaults.headers.common['x-auth-token'] = token;
    const response = await axios.put(`${apiURL}/${card_id}`, {
                title: card.title,
                subtitle: card.subtitle,
                description: card.description,
                phone: card.phone,
                email: card.email,
                web: card.web,
                image: { url: card.image.url, alt: card.image.alt },
                address: { city: card.address.city, street: card.address.street, houseNumber: card.address.houseNumber, country: card.address.country, state: card.address.state, zip: card.address.zip }
            }, {
        headers: {
            'x-auth-token': token
        }
    });
    return response.data;
};

export const deleteCard = async (apiURL, card_id) => {
    const token = localStorage.getItem('x-auth-token');
    axios.defaults.headers.common['x-auth-token'] = token;
    const response = await axios.delete(`${apiURL}/${card_id}`, {
        headers: {
            'x-auth-token': token
        }
    });
    return response.data;
};

export const checkEmailExistence = async (apiURL, email) => {
    try {
        const response = await axios.get(`${apiURL}/check-email/${email}`);
        return response.data.exists;
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error;
    }
};

export const METHOD = {
        GET_ALL: 'GET_ALL',
        GET_ONE: 'GET_ONE',
        CREATE: 'CREATE',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
}