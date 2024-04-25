import React from 'react'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CardItem = ({ id, image, title, role, commentCount }) => {

  return (
    <Card style={{ width: '18rem', boxShadow: '5px 5px 5px gray', marginTop: '20px' }} >
      <Card.Img variant="top" src={image} />
      <Card.Body >
        <Card.Title>{title}</Card.Title>

        <Link to={`${id}`}>
          <Button variant="primary" className='mt-3'>Details</Button>
        </Link>

        {role == 2 &&
          <p className="font-weight-bold mt-2">comment count - {commentCount}</p>
        }

      </Card.Body>
    </Card>
  )
}
