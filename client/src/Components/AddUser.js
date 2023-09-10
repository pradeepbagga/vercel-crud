import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);

        axios.post('/create-user', { name, city })
            .then(response => {
                console.log('Submit response - ', response);
                navigate("/");
            })
            .catch(error => {
                console.log('Submit ERROR - ', error);
            });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='addUserPage'>
                <h3>Add User</h3>
                <div>
                    <TextField id="user-name" label="User Name" variant="outlined"
                        {...register("userName", { required: true, pattern: /^[A-Za-z]+$/i })}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.userName?.type === "required" && <p className='error'>This field is required.</p>}
                    {errors.userName?.type === "pattern" && <p className='error'>Please enter only alphabet.</p>}
                </div>
                <div>
                    <TextField id="city" label="City" variant="outlined"
                        {...register("city", { required: true, pattern: /^[A-Za-z]+$/i })}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city?.type === "required" && <p className='error'>This field is required.</p>}
                    {errors.city?.type === "pattern" && <p className='error'>Please enter only alphabet.</p>}
                </div>
                <div>
                    <Button variant="contained" type='submit'>Add</Button>
                </div>
            </div>
        </form>
    )
}

export default AddUser