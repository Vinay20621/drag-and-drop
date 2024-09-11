import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Auth() {
  const { token } = useParams(); // Extract token from URL parameters
  const navigate = useNavigate(); // For programmatic navigation

  
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/home");
    }
  }, [token]);
  return (
    <div>
      {/* Optionally, you can display a loading spinner or message */}
      <p>{token}</p>
    </div>
  );
}

