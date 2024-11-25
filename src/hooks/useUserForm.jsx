import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RoleTypes } from '../components/navbar/Navbar';
import {jwtDecode} from 'jwt-decode';
import { GeneralContext } from "../App";
import Joi from 'joi';

const useUserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const phoneRegex = /^(0(5[^7]|[2-4]|[8-9]))([\d]{7})$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[A-Za-z\d!@#$%^&*()-]{7,}$/;

    const userSchema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(50).required(),
            middle: Joi.string().min(2).max(50).allow(''),
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
    })

    const loginSchema = Joi.object({
        email: Joi.string().regex(emailRegex).required(),
        password: Joi.string().required(),
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { setUserRoleType } = useContext(GeneralContext);

    const handleInput = async (e) => {
        const { name, value, type, checked } = e.target;
        let updatedFormData;

        if (name in formData) {
            // עידכון שדות ברמת העדכון הראשי
            updatedFormData = { ...formData, [name]: type === 'checkbox' ? checked : value };
            
        } else if (name.startsWith('name.')) {
            // עידכון שדות ב-name
            const nameField = name.split('.')[1];
            updatedFormData = {
                ...formData,
                name: { ...formData.name, [nameField]: value }
            };
        } else if (name.startsWith('image.')) {
            // עידכון שדות ב-image
            const imageField = name.split('.')[1];
            updatedFormData = {
                ...formData,
                image: { ...formData.image, [imageField]: value }
            };
        } else if (name.startsWith('address.')) {
            // עידכון שדות ב-address
            const addressField = name.split('.')[1];
            updatedFormData = {
                ...formData,
                address: { ...formData.address, [addressField]: value }
            };
        } else {
            // אם השדה לא נמצא, נניח שהוא מחוץ לטווח הסביר
            updatedFormData = formData;
        }

        // עדכון הנתונים
        setFormData(updatedFormData);

        // ביצוע הוולידציה
        const { error } = userSchema.validate(updatedFormData, { abortEarly: false });
        
        const newErrors = {};

        if (error) {
            error.details.forEach(({ context: { key }, message }) => {
                newErrors[key] = message;
            });
        }

        setErrors(newErrors);
    };

    
    const submit = async (e) => {
        e.preventDefault();

         // שלב 1: בדוק את הנתונים עם Joi
        const { error } = userSchema.validate(formData, { abortEarly: false });
    
        if (error) {
            const newErrors = {};
            error.details.forEach(({ context: { key }, message }) => {
                newErrors[key] = message;
            });
            setErrors(newErrors);
            return;
        }

            try {
                const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', formData);
                console.log(response.data);
                // setErrors({});
                setSnackbarMessage('User created successfully');
                setSnackbarOpen(true);
            } catch (error) {
                // console.error('Error registering', error);
                console.error('Response data:', error.response.data);
                setErrors({ global: 'An error occurred while creating the user' });
            } 
    };

//     const submit = async (e) => {
//     e.preventDefault();

//     // הסרת שדות לא רצויים
//     const { _id, ...cleanedData } = formData;

//     // שלב 1: בדוק את הנתונים עם Joi
//     const { error } = userSchema.validate(cleanedData, { abortEarly: false });

//     if (error) {
//         const newErrors = {};
//         error.details.forEach(({ context: { key }, message }) => {
//             newErrors[key] = message;
//         });
//         setErrors(newErrors);
//         return;
//     }

//     try {
//         const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', cleanedData);
//         console.log(response.data);
//         setSnackbarMessage('User created successfully');
//         setSnackbarOpen(true);
//     } catch (error) {
//         console.error('Response data:', error.response.data);
//         setErrors({ global: 'An error occurred while creating the user' });
//     } 
// };


    const login = async (e) => {
        e.preventDefault();

          // שלב 1: בדוק את הנתונים עם Joi
        const { error } = loginSchema.validate({ email: formData.email, password: formData.password }, { abortEarly: false });
    
        if (error) {
            const newErrors = {};
            error.details.forEach(({ context: { key }, message }) => {
                newErrors[key] = message;
            });
            setErrors(newErrors);
            return;
        }

            try {
            const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
                email: formData.email,
                password: formData.password
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
                console.error('Response data:', error.response.data);
                setErrors({ global: 'Invalid email or password' });
            } 
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        navigate('/auth/login')
    };

    const handleReset = () => {
        setFormData({
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

    
    return [formData, setFormData, handleInput, submit, login, errors, handleReset, handleCloseSnackbar, snackbarOpen, snackbarMessage];
}

export default useUserForm;



