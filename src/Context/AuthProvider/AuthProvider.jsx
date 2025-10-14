"use client";
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/Firebase/Firebase.config';
import { AuthContext } from '../AuthContext/AuthContext';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const[themeChanger, setThemeChanger] = useState()

    const provider = new GithubAuthProvider();

    const createAccount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginAccount = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const profileUpdateNamePhoto = (newData) => {
        setLoading(true)
        return updateProfile(auth.currentUser, newData)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const gitHubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider) 
    }

    const logoutAccount = () => {
        setLoading(true)
        return signOut(auth)
    }

     const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log("User in the auth state change", currentUser);
        })
        return () => {
            unsubscribe()
        }

    }, [])


    const authData = {
        createAccount,
        loginAccount,
        googleLogin,
        gitHubLogin,
        profileUpdateNamePhoto,
        logoutAccount,
        user,
        loading,
        resetPassword,
        themeChanger,
        setThemeChanger
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;