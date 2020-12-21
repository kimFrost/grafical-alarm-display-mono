import React, { useState } from 'react';
import { TextField, Button, Modal, Container, Paper, Grid, Card, Box, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";

import { Root } from './styles';
import { useEffect } from 'react';
import useAPI from '../API/useAPI';

interface ILoginForm extends FormData {
    username: string
    password: string
}

const LoginFlow: React.FC = ({ children }) => {

    const [error, setError] = useState(null)
    const [pending, setIsPending] = useState(true)
    const [pendingLogin, setPendingLogin] = useState(false)
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
            setPendingLogin(true)
            api.post('/account/Login', {
                username: data.username,
                password: data.password
            }).then(
                response => {
                    const token = response.data;
                    api.setClientToken(token);
                    setTimeout(() => {
                        setIsLoggedIn(true)
                        setPendingLogin(false)
                    }, 600)
                }

            ).catch(
                error => {
                    console.log('error', error)
                    setTimeout(() => {
                        setError(error)
                        setPendingLogin(false)
                    }, 600)
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
                    <Container maxWidth="xs">
                        <form onSubmit={onSubmit}>
                            <Grid
                                container
                                spacing={3}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '100vh' }}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        inputRef={register}
                                        label="Username"
                                        name="username"
                                        size="small"
                                        variant="outlined"
                                        id="fieldUsername"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        inputRef={register}
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        id="fieldPassword"
                                        autoComplete="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        disabled={pendingLogin}
                                    >
                                        Log in
                                        {pendingLogin &&
                                            <div style={{
                                                display: 'flex',
                                                position: 'absolute',
                                                left: '50%',
                                                top: '50%',
                                                transform: 'translate(-50%, -50%)'
                                            }} >
                                                <CircularProgress size={20} />
                                            </div>
                                        }
                                    </Button>
                                </Grid>
                                {/* <code>({JSON.stringify(error)})</code> */}
                            </Grid>
                        </form>
                    </Container>
                : <div>Pending...</div>
            }
        </>
    );
};

export default LoginFlow;
