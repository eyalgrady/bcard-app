import React, { useEffect, useState } from 'react'

export default function EditUserSs({ user, productChange }) {
    const [formData, setFormData] = useState();
      const token = localStorage.getItem('x-auth-token');


    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData();
        }
    }, [user])

    const inputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, 
            [name]: value
        });
    }

    const save = (e) => {
        e.preventDefault();

        // if (!formData.name) {
        //     alert("חייב לתת שם למוצר");
        //     return;
        // }
        // if (!formData.price || formData.price <= 0) {
        //     alert("מחיר המוצר חייב להיות גדול מ-0");
        //     return;
        // }

        fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(formData),
        })
        .then(()=>{
            productChange(formData);
        });
    }

    return (
        <>
        {formData && (
                <div className="modal-frame">
                    <div className="modal">
                        <header>
                            <button className='close' onClick={() => productChange()}>x</button>
                            <h2>Edit User</h2>
                        </header>
                        <form onSubmit={save}>
                            <label>
                                First Name:
                                <input type="text" name="name.first" value={formData.name.first} onChange={inputChange} />
                            </label>
                            <label>
                                Middle Name:
                                <input type="text" name="name.middle" value={formData.name.middle} onChange={inputChange} />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" name="name.last" value={formData.name.last} onChange={inputChange} />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phone" value={formData.phone} onChange={inputChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={formData.email} onChange={inputChange} />
                            </label>
                            <label>
                                Street:
                                <input type="text" name="address.street" value={formData.address.street} onChange={inputChange} />
                            </label>
                            <label>
                                House Number:
                                <input type="number" name="address.houseNumber" value={formData.address.houseNumber} onChange={inputChange} />
                            </label>
                            <label>
                                City:
                                <input type="text" name="address.city" value={formData.address.city} onChange={inputChange} />
                            </label>
                            <label>
                                Country:
                                <input type="text" name="address.country" value={formData.address.country} onChange={inputChange} />
                            </label>
                            <label>
                                State:
                                <input type="text" name="address.state" value={formData.address.state} onChange={inputChange} />
                            </label>
                            <label>
                                Zip Code:
                                <input type="number" name="address.zipCode" value={formData.address.zip} onChange={inputChange} />
                            </label>
                            <label>
                                Signup as Business:
                                <input type="checked" name="isBusiness" value={formData.isBusiness} onChange={inputChange} />
                            </label>
                            <label>
                                Signup as Admin:
                                <input type="checked" name="isAdmin" value={formData.isAdmin} onChange={inputChange} />
                            </label>
                            <button>Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
