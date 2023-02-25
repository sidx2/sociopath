import React, {useState} from 'react'
import useAuth from './hooks/useAuth';

export const ProtectedPage = (props) => {
    // const useAuthIs = useAuth();
    console.log("the props: ", props)
    // console.log(useAuthIs);
    return (
        <>
            <h1>This is a protected page</h1>
        </>
    )
}