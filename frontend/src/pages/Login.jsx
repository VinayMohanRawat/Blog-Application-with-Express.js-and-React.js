import React from 'react'
import { Login } from '../components/Login'
import { json, redirect } from 'react-router-dom'

export const LoginPage = () => {
    return (
        <Login />
    )
}


export async function action({ request }) {
    const data = await request.formData();

    let account_type = 1

    if (data.get('checkbox') === null) {
        account_type = 2
    }

    const body = {
        email: data.get('email'),
        password: data.get('password'),
        account_type: account_type
    }

    const response = await fetch('https://blog-application-backend-7wcn.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (response.status === 422 || response.status === 401) {

        const resData = await response.json()

        throw json({ message: resData.message }, { status: 500 })

    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate user.' }, { status: 500 })
    }

    const resData = await response.json();

    if (resData.status === false) {
        throw json({ message: resData.message }, { status: 500 })
    }

    const token = resData.token
    const role = resData.account_type

    localStorage.setItem('token', token);
    localStorage.setItem('role', role)

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24)
    localStorage.setItem('expiration', expiration.toISOString())

    if (role == 1) {
        return redirect('/blogger')
    } else {

        return redirect('/reader')
    }


}