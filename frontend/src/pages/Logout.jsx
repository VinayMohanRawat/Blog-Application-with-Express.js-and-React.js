import { redirect } from "react-router-dom";


export async function action() {
    const token = localStorage.getItem('token');

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration')

    await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });


    return redirect('/')
}