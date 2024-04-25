import React from 'react'
import { ReaderNavigation } from '../components/Reader/ReaderNavigation'
import { Outlet } from 'react-router-dom'
import { useRouteLoaderData } from 'react-router-dom'

export const ReaderRootLayout = () => {
    const { token, role } = useRouteLoaderData('root')


    return (
        <>
            {token && (role == 2) && <>
                <ReaderNavigation />
                <Outlet />
            </>}
        </>
    )
}
