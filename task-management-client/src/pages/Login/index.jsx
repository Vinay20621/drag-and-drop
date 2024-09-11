import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  TextField,
} from "@mui/material";
import styles from "./styles.module.css";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BackendUrl = process.env.REACT_APP_BACKEND_URL;

export default function LogIn() {
  const [submitFormError, setSubmitFormError] = useState({
    success: false,
    loading: false,
    error: false,
    isFormDataError: false,
  });
  const [isError, setIsError] = useState({
    isEmailError: false,
    isPasswordError: false,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const [errorMsg,setErrorMsg]=useState("")
  const navigate = useNavigate(); 
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleChange = (e, value) => {
    if (value === "email") {
      if (e.target?.value && e.target.value.match(isValidEmail)) {
        setIsError({ ...isError, isEmailError: false });
      } else {
        setIsError({ ...isError, isEmailError: true });
      }
      setFormData({ ...formData, email: e.target.value });
    } else if (value === "password") {
      setFormData({ ...formData, password: e.target.value });
      if (e.target.value.length < 4) {
        setIsError({ ...isError, isPasswordError: true });
      } else {
        setIsError({ ...isError, isPasswordError: false });
      }
    }
  };
    const handleGoogleSuccess = () => {
      window.open(
        `${ BackendUrl}/auth/google/callback`,
        "_self"
      );
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.length===0  || formData.password.length===0) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }
    if (isError.isEmailError || isError.isPasswordError) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }

    try {
      setSubmitFormError({ ...submitFormError, loading: true });
      const response = await axios.post(`${ BackendUrl}/auth/login`, formData);      

      if (response?.data?.success) {
        setSubmitFormError({
          success: true,
          loading: false,
          error: false,
          isFormDataError: false,
        });
        localStorage.setItem("token",JSON.stringify(response?.data?.token))
        navigate('/home'); 
      } else {
        setErrorMsg(response?.data?.msg || 'Something went wrong');
        setSubmitFormError({
          success: false,
          loading: false,
          error: true,
          isFormDataError: false,
        });
        
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || 'Something went wrong');
      setSubmitFormError({
        success: false,
        loading: false,
        error: true,
        isFormDataError: false,
      });
    }
  };

  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box className={styles.contactForm}>
        <Box className={styles.contactTitle}>LogIn</Box>
        <form onSubmit={handleSubmit}>
          <TextField
            error={isError.isEmailError}
            id="standard-error-helper-text"
            label="Email"
            helperText={isError.isEmailError && "Please enter a valid email"}
            variant="standard"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            fullWidth
            margin="normal"
          />

          <TextField
            error={isError.isPasswordError}
            id="standard-error-helper-text"
            label="Password"
            helperText={isError.isPasswordError && "Password must be at least 4 characters"}
            variant="standard"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            fullWidth
            margin="normal"
          />

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="outlined" color="success">
              Login
            </Button>
          </Box>

          <Box style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account? <span style={{ color: 'blue',cursor:"pointer" }} onClick={()=>navigate("/signup")}>Signup</span>
          </Box>

          <Box style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <Button variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSuccess}>
              Login with Google
            </Button>
          </Box>

          {submitFormError.success && (
            <Alert severity="success" color="success">
              Login successful
            </Alert>
          )}
          {submitFormError.error && (
            <Alert severity="error" color="error">
              {errorMsg}
            </Alert>
          )}
          {submitFormError.isFormDataError && (
            <Alert severity="error" color="error">
              Please resolve all errors
            </Alert>
          )}
        </form>
      </Box>     
    </Box>
  );
}

