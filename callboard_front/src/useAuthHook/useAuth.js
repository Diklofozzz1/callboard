import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react'

import {Login, ShowMe} from '../api/auth/auth.services'
import {useLocation} from "react-router-dom";
import authHeader from "../api/auth/auth.header";

const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [user, setUser] = useState(undefined)
    const [error, setError] = useState(undefined)
    const location = useLocation()

    useEffect(() => {
        if (error) {
            setError(undefined)
        }
    }, [location.pathname])

    useEffect(() => {
        if (user === undefined) {
            me()
        }
    }, [])

    function me() {
        ShowMe().then(updated => {
            setUser(updated)
        }).catch(err => {
            console.log(err)
            setError(err.response)
        })
    }

    async function login(props) {
        try {
            const result = await Login(props)
            if (result.token !== undefined) {
                localStorage.setItem('token', result.token)
                me()
                return true
            }
        } catch (err) {
            return err.response?.status
        }
    }

    function logout() {
        localStorage.removeItem('token')
        setUser(undefined)
        setError(undefined)
    }

    const memValue = useMemo(() => ({
        user,
        error,
        login,
        logout,
        me
    }), [user, error])

    return (
        <AuthContext.Provider value={memValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}