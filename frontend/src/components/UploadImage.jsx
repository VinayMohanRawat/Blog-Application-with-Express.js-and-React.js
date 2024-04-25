import React, { useState } from 'react';
import './UploadImage.css';
import { Link, useParams, useNavigation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { getAuthToken } from '../util/auth';

export const UploadImage = () => {
  const token = getAuthToken();
  const { uploadId } = useParams();
  const navigation = useNavigation();
  const navigate = useNavigate();

  let isSubmitting = navigation.state === 'submitting'

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('uploadId', uploadId);


    try {
      const response = await axios.post('http://localhost:3000/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token
        }
      });

      navigate('/')

    } catch (error) {
      console.error('Error uploading image:', error);
    }

  };


  return (
    <div className='upload'>
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="image" className='my-3'><h5>Upload image</h5></label>
        <input type="file" className="form-control-file" onChange={handleFileChange} />

        <button type="submit" className="btn btn-success mt-4"> {isSubmitting ? 'Submitting...' : 'Upload'}  </button>

      </form>
      <div className='skip'>
        <Link to='/'><button type="button" class="btn btn-light">Skip</button></Link>
      </div>
    </div>
  )
}
