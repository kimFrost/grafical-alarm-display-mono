import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";

import { Container } from './styles';
import { useEffect } from 'react';
import useAPI from '../API/useAPI';

interface ILoginForm extends FormData {
    username: string
    password: string
}

const LoginFlow: React.FC = ({ children }) => {

    const [error, setError] = useState(null)
    const [pending, setIsPending] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { handleSubmit, register } = useForm<ILoginForm>();

    const api = useAPI();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (api) {
                api.setClientToken(token)
            }
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
        if (api) {
            return api.get('/account/IsAuthenticated')
                .then(response => {
                    setIsLoggedIn(true)
                    setIsPending(false)
                })
                .catch(error => {
                    setIsPending(false)
                    console.error(error)
                    if (error.response) {
                        if (error.response.status === 401) {
                            api.clearClientToken()
                            setIsLoggedIn(false)
                        }
                    }
                })
        }

    }

    const onSubmit = handleSubmit((data) => {
        if (api) {
            api.post('/account/Login', {
                username: data.username,
                password: data.password
            }).then(
                response => {
                    const token = response.data;
                    api.setClientToken(token);
                    setIsLoggedIn(true)
                }

            ).catch(
                error => {
                    console.log('error', error)
                    setError(error)
                }
            )
        }
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
                                Log in ({JSON.stringify(error)})
                            </Button>
                        </form>
                    </div>
                : <div>Pending...</div>
            }
        </>
    );
};

export default LoginFlow;
