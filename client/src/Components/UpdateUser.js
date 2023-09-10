import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        console.log('ID - ', id)
        axios.get(`/user/${id}`)
            .then(res => {
                console.log('Get user - ', res);
                setName(res.data.name);
                setCity(res.data.city);
            })
            .catch(err => {
                console.log('Get user error - ', err)
            });
    }, []);

    const onSubmit = data => {
        console.log(data);

        axios.put(`/update/${id}`, { name, city })
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
                <h3>Update User</h3>
                <div>
                    <TextField id="user-name" variant="outlined" value={`${name}`}
                        {...register("userName", { required: true, pattern: /^[A-Za-z ]+$/i })}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.userName?.type === "required" && <p className='error'>This field is required.</p>}
                    {errors.userName?.type === "pattern" && <p className='error'>Please enter only alphabet.</p>}
                </div>
                <div>
                    <TextField value={city} id="city" variant="outlined"
                        {...register("city", { required: true, pattern: /^[A-Za-z ]+$/i })}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city?.type === "required" && <p className='error'>This field is required.</p>}
                    {errors.city?.type === "pattern" && <p className='error'>Please enter only alphabet.</p>}
                </div>
                <div>
                    <Button variant="contained" type='submit'>Update</Button>
                </div>
            </div>
        </form>
    )
}

export default UpdateUser;