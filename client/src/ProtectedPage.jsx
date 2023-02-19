import React, {useState} from 'react'
import useAuth from './hooks/useAuth';

export const ProtectedPage = () => {
    const useAuthIs = useAuth();
    console.log(useAuthIs);
    return (
        <>
            <h1>This is a protected page</h1>
        </>
    )
}