import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../hooks/AuthProvider';
import axios from 'axios';

const ImageDisplay = ({ byteData }) => {
  const [base64Image, setBase64Image] = useState('');
  const [image,setImage] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const { token } = useUserContext();
  const loadingImage=async()=>{
    const res = await axios.get("http://localhost:8080/api/v1/test/12/profile-image",
        { headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
    console.log(res)
    return res.data
  }
  
  return (
    <div>
      <h2>Resim</h2>
      <img src="https://baligongbuckettest.s3.eu-west-1.amazonaws.com/profile-images/3/2f1e5cb3-1a84-449e-b803-25fb5b109de0.png" alt="Resim" />
    </div>
  );
};

export default ImageDisplay;
