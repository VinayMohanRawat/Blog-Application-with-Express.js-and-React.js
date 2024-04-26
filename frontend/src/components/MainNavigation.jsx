import React from 'react'
import { Link, useRouteLoaderData, Form } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import './MainNavigation.css';


export const MainNavigation = () => {
    const { token, role } = useRouteLoaderData('root')

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to={!token ? '/' : (role == 1 ? '/blogger' : '/reader')}>
                    <Navbar.Brand>
                        Blog-App
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button variant="outline-light" ><Link to={!token ? '/' : (role == 1 ? '/blogger' : '/reader')}>
                            Home
                        </Link>
                        </Button>
                        {!token &&
                            <>
                                <Button variant="outline-light" ><Link to="signup" >Sign up</Link>  </Button>
                                <Button variant="outline-light" ><Link to="login" >Login</Link>  </Button>
                            </>
                        }
                        {token &&
                            <>
                                <Form action='/logout' method='POST'>
                                    <button className='logout_button'>Logout</button>
                                </Form>
                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >


    )
}
