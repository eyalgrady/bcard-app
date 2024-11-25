import { useState, useContext } from "react";
import User from "../models/User";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from '../components/navbar/Navbar';
import {jwtDecode} from 'jwt-decode';
import { GeneralContext } from "../App";
import Joi from 'joi';

const useUserForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        email: '',
        password: '',
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
        isBusiness: false
    });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { setUserRoleType } = useContext(GeneralContext);
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
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

        const schema = contactSchema.validate(user);
        console.log(schema);
        // setErrors(prevErrors => ({
        //     ...prevErrors,
        //     [name]: ''
        // }));
    };
    
    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        const { valid, errors } = validateForm(user);
        
        
        if (valid) { 
            
            const newUser = new User(
                user.name.first,
                user.name.middle,
                user.name.last,
                user.email,
                user.image.url,
                user.address.state,
                user.address.city,
                user.address.houseNumber,
                user.phone,
                user.password,
                user.image.alt,
                user.address.country,
                user.address.street,
                user.address.zip,
                user.isBusiness
            );
            try {
                const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', newUser);
                console.log(response.data);
                setErrors({});
                setSnackbarMessage('User created successfully');
                setSnackbarOpen(true);
            } catch (error) {
                validateForm(user)
                // console.error('Error registering', error);
                console.error('Response data:', error.response.data);
            } 
        } else {
            setErrors(errors);
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        
        const { errors } = validateForm(user);

            try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                email: user.email,
                password: user.password
            });
            const token = response.data;
            localStorage.setItem('x-auth-token', token);
            const decodedToken = jwtDecode(token);

            if (decodedToken) {
                if (decodedToken.isAdmin === true) {
                    setUserRoleType(RoleTypes.admin);
                } else if (decodedToken.isBusiness === true) {
                    setUserRoleType(RoleTypes.business);
                } else {
                    setUserRoleType(RoleTypes.user);
                }
            } 
            navigate('/');
            } catch (error) {
                // console.error('Error registering', error);
                console.error('Response data:', error.response.data);
            } finally {
                setErrors(errors)
            }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        navigate('/auth/login')
    };

    const handleReset = () => {
        setUser({
        name: {
            first: '',
            middle: '',
            last: ''
        },
        phone: '',
        email: '',
        password: '',
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
        isBusiness: false
    });
        setErrors({});
    };

    const phoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[A-Za-z\d!@#$%^&*()-]{7,}$/;

    const contactSchema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(50).required(),
            middle: Joi.string().min(2).max(50),
            last: Joi.string().min(2).max(50).required()
        }),
        phone: Joi.string().regex(phoneRegex).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(passwordRegex).required(),
        image: Joi.object({
            url: Joi.string().required(),
            alt: Joi.string().required()
        }),
        address: Joi.object({
            state: Joi.string().required(),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.string().required(),
            zip: Joi.string().required()
        }),
        isBusiness: Joi.boolean().required()
    })

    const validateForm = (user) => {
        let valid = true;
        const errors = {};
        const phoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[A-Za-z\d!@#$%^&*()-]{7,}$/;

        // Validations for each field
        if (!user.name.first.trim()) {
            errors.first = "First Name is required";
            valid = false;
        } else if (user.name.first.trim().length < 2) {
            errors.first = "First Name length must be at least 2 characters long";
            valid = false;
        }
        if (!user.name.last.trim()) {
            errors.last = "Last Name is required";
            valid = false;
        } else if (user.name.last.trim().length < 2) {
            errors.last = "Last Name length must be at least 2 characters long";
            valid = false;
        }
        if (!user.phone.trim()) {
            errors.phone = "Phone is required";
            valid = false;
        } else if (!user.phone.match(phoneRegex)) {
            errors.phone = "Invalid phone number";
            valid = false;
        }
        if (!user.email.trim()) {
            errors.email = "Email is required";
            valid = false;
        } else if (!user.email.match(emailRegex)) {
            errors.email = "Invalid email format";
            valid = false;
        }
        if (!user.password.trim()) {
            errors.password = "Password is required";
            valid = false;
        } else if (!user.password.match(passwordRegex)) {
            errors.password = "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-";
        valid = false;
        }
        if (!user.address.country.trim()) {
            errors.country = "Country is required";
            valid = false;
        } else if (user.address.country.trim().length < 2) {
            errors.country = "Country length must be at least 2 characters long";
            valid = false;
        }
        if (!user.address.city.trim()) {
            errors.city = "City is required";
            valid = false;
        } else if (user.address.city.trim().length < 2) {
            errors.city = "City length must be at least 2 characters long";
            valid = false;
        }
        if (!user.address.street.trim()) {
            errors.street = "Street is required";
            valid = false;
        } else if (user.address.street.trim().length < 2) {
            errors.street = "Street length must be at least 2 characters long";
            valid = false;
        }
        if (!user.address.houseNumber.trim()) {
            errors.houseNumber = "House Number is required";
            valid = false;
        }
        if (!user.address.zip.trim()) {
            errors.zip = "Zip Code is required";
            valid = false;
        }

        return { valid, errors };
    };

    return [user, setUser, handleChange, handleSubmitRegister, handleSubmitLogin, errors, handleReset, handleCloseSnackbar, snackbarOpen, snackbarMessage];
}

export default useUserForm;