import { redirect } from "react-router-dom";


export async function action() {
    const token = localStorage.getItem('token');

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration')

    await fetch('https://blog-application-backend-7wcn.onrender.com/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });


    return redirect('/')
}