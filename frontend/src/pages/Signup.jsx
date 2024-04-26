import React from 'react'
import { json, redirect } from 'react-router-dom';
import { Signup } from '../components/Signup';


export const SignupPage = () => {
    return (
        <Signup />
    )
}

export async function action({ request }) {

    const data = await request.formData();

    let account_type = 1
    if (data.get('checkbox') == null) {
        account_type = 2
    }

    const body = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
        account_type: account_type
    }

    const response = await fetch('http://localhost:3000/createaccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const resData = await response.json();

    if (!response.ok) {
        throw json({ message: resData.message }, { status: 500 })
    }

    if (resData.status === false) {
        throw json({ message: resData.message }, { status: 500 })
    }

    return redirect('/success')

}
