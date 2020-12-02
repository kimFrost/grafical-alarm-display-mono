import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";

import { Container } from './styles';
import { useEffect } from 'react';
import APIKit, { setClientToken, clearClientToken } from './../../Util/APIKit';


interface ILoginForm extends FormData {
    username: string
    password: string
}

const LoginFlow: React.FC = ({ children }) => {

    const [pending, setIsPending] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { handleSubmit, register } = useForm<ILoginForm>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setClientToken(token)
            checkLoggedIn()
        }
        else {
            setIsPending(false)
        }
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkLoggedIn()
        }, 300000)
        return () => clearInterval(timer)
    }, [])

    const checkLoggedIn = () => {
        return APIKit.get('/account/IsAuthenticated')
            .then(response => {
                setIsLoggedIn(true)
                setIsPending(false)
            })
            .catch(error => {
                setIsPending(false)
                if (error.response.status === 401) {
                    clearClientToken()
                    setIsLoggedIn(false)
                }
            })
    }

    const onSubmit = handleSubmit((data) => {
        APIKit.post(`/account/Login?username=${data.username}&password=${data.password}`, {
            username: data.username,
            password: data.password
        }).then(
            response => {
                const token = response.data;
                setClientToken(token);
                setIsLoggedIn(true)
            }

        ).catch(
            error => console.log('error', error)
        )
    });

    return (
        <>
            {!pending ?
                isLoggedIn ?
                    children
                    :
                    <div>
                        <form onSubmit={onSubmit}>
                            <TextField
                                fullWidth
                                inputRef={register}
                                label="Username"
                                name="username"
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                inputRef={register}
                                label="Password"
                                name="password"
                                size="small"
                                type="password"
                                variant="outlined"
                            />
                            <Button color="secondary" fullWidth type="submit" variant="contained">
                                Log in
                </Button>
                        </form>
                    </div>
                : <div>Pending...</div>
            }
        </>
    );
};

export default LoginFlow;
