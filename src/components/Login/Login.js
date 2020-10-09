import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../../API'
import './Login.css'
const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://bubbleplan.net/blog/wp-content/uploads/2018/01/logo-discord.jpg" alt="" />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
