import { useState, useContext } from "react";
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

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setUser(prevUser => ({
                ...prevUser,
                [parent]: {
                    ...prevUser[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const validate = (data) => {
        const { error } = contactSchema.validate(data, { abortEarly: false });
        if (error) {
            const errors = error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {});
            setErrors(errors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        if (!validate(user)) return;

        const newUser = {
            ...user,
            name: {
                ...user.name
            },
            image: {
                ...user.image
            },
            address: {
                ...user.address
            }
        };

        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', newUser);
            console.log(response.data);
            setSnackbarMessage('User created successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error registering', error.response.data);
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        if (!validate({ email: user.email, password: user.password })) return;

        try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                email: user.email,
                password: user.password
            });
            const token = response.data;
            localStorage.setItem('x-auth-token', token);
            const decodedToken = jwtDecode(token);

            if (decodedToken) {
                if (decodedToken.isAdmin) {
                    setUserRoleType(RoleTypes.admin);
                } else if (decodedToken.isBusiness) {
                    setUserRoleType(RoleTypes.business);
                } else {
                    setUserRoleType(RoleTypes.user);
                }
            }
            navigate('/');
        } catch (error) {
            console.error('Error logging in', error.response.data);
            setErrors({ login: 'Login failed. Please check your credentials.' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        navigate('/auth/login');
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[A-Za-z\d!@#$%^&*()-]{7,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const contactSchema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(50).required(),
            middle: Joi.string().min(2).max(50),
            last: Joi.string().min(2).max(50).required()
        }),
        phone: Joi.string().regex(phoneRegex).required(),
        email: Joi.string().regex(emailRegex).required(),
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
    });

    return [user, setUser, handleChange, handleSubmitRegister, handleSubmitLogin, errors, handleReset, handleCloseSnackbar, snackbarOpen, snackbarMessage];
};

export default useUserForm;
