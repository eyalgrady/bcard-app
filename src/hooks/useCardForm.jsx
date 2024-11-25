import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../models/Card";
import { createCard } from "./UseAPI";
import APIContext from '../components/contexts/APIContext';

const useCardForm = () => {
    const navigate = useNavigate();
    const [card, setCard] = useState({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: ''
        },
    });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const apiURL = useContext(APIContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCard(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
            name: {
                ...prevUser.name,
                [name]: value
            },
            image: {
                ...prevUser.image,
                [name]: value
            },
            address: {
                ...prevUser.address,
                [name]: value
            }
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };
    
    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        const { valid, errors } = validateForm();
        if (valid) { 
            const newCard = new Card(
                card.title,
                card.subtitle,
                card.description,
                card.phone,
                card.email,
                card.web,
                card.image.url,
                card.image.alt,
                card.address.state,
                card.address.country,
                card.address.city,
                card.address.street,
                card.address.houseNumber,
                card.address.zip,
            )

        try {
            await createCard(apiURL, newCard);
            setErrors({});
            setSnackbarMessage('Card created successfully');
            setSnackbarOpen(true);
        } catch (error) {
            // console.error('Error creating card', error);
            console.error('Response data:', error.response.data);
        }
        } else {
            setErrors(errors);
        }
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};
        const phoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        // Validations for each field
        if (!card.title.trim()) {
            errors.title = "Title is required";
            valid = false;
        } else if (card.title.trim().length < 2) {
            errors.title = "Title length must be at least 2 characters long";
            valid = false;
        }
        if (!card.subtitle.trim()) {
            errors.subtitle = "Subtitle is required";
            valid = false;
        } else if (card.subtitle.trim().length < 2) {
            errors.subtitle = "Subtitle length must be at least 2 characters long";
            valid = false;
        }
        if (!card.description.trim()) {
            errors.description = "Dscription is required";
            valid = false;
        } else if (card.description.trim().length < 2) {
            errors.description = "Dscription length must be at least 2 characters long";
            valid = false;
        }
        if (!card.phone.trim()) {
            errors.phone = "Phone is required";
            valid = false;
        } else if (!card.phone.match(phoneRegex)) {
            errors.phone = "Invalid phone number";
            valid = false;
        }
        if (!card.email.trim()) {
            errors.email = "Email is required";
            valid = false;
        } else if (!card.email.match(emailRegex)) {
            errors.email = "Invalid email format";
            valid = false;
        }
        if (!card.address.country.trim()) {
            errors.country = "Country is required";
            valid = false;
        } else if (card.address.country.trim().length < 2) {
            errors.country = "Country length must be at least 2 characters long";
            valid = false;
        }
        if (!card.address.city.trim()) {
            errors.city = "City is required";
            valid = false;
        } else if (card.address.city.trim().length < 2) {
            errors.city = "City length must be at least 2 characters long";
            valid = false;
        }
        if (!card.address.street.trim()) {
            errors.street = "Street is required";
            valid = false;
        } else if (card.address.street.trim().length < 2) {
            errors.street = "Street length must be at least 2 characters long";
            valid = false;
        }
        if (!card.address.houseNumber.trim()) {
            errors.houseNumber = "House Number is required";
            valid = false;
        }
        if (!card.address.zip.trim()) {
            errors.zip = "Zip Code is required";
            valid = false;
        }
        
        setErrors(errors);
        return { valid, errors };
    };
    
    const handleReset = () => {
        setCard({
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        image: {
            url: '',
            alt: ''
        },
        address: {
            state: '',
            country: '',
            city: '',
            street: '',
            houseNumber: '',
            zip: ''
        },
    });
        setErrors({});
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        navigate('/cards/my-cards')
    };

    return [card, handleChange, handleSubmitCreate, errors, handleReset, handleCloseSnackbar, snackbarOpen, snackbarMessage];
}

export default useCardForm;