import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const BackendUrl = process.env.REACT_APP_BACKEND_URL;
export default function SignIn() {
  const [submitFormError, setSubmitFormError] = useState({
    success: false,
    loading: false,
    error: false,
    isFormDataError: false,
  });
  const [isError, setIsError] = useState({
    isFirstNameError: false,
    isLastNameError: false,
    isEmailError: false,
    isPasswordError: false,
    isComfirmPasswordError: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleChange = (e, value) => {
    if (value === "first-name") {
      setFormData({ ...formData, firstName: e.target.value });
      setIsError({ ...isError, isFirstNameError: e.target.value.length < 4 });
    } else if (value === "last-name") {
      setFormData({ ...formData, lastName: e.target.value });
      setIsError({ ...isError, isLastNameError: e.target.value.length < 4 });
    } else if (value === "email") {
      setFormData({ ...formData, email: e.target.value });
      setIsError({ ...isError, isEmailError: !e.target.value.match(isValidEmail) });
    } else if (value === "password") {
      setFormData({ ...formData, password: e.target.value });
      setIsError({ ...isError, isPasswordError: e.target.value.length < 4 });
    } else if (value === "comfirm-password") {
      setFormData({ ...formData, comfirmPassword: e.target.value });
      setIsError({ ...isError, isComfirmPasswordError: e.target.value !== formData.password });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.firstName.length===0 || formData.lastName.length===0  || formData.email.length===0  || formData.password.length===0  || formData.comfirmPassword.length===0 ) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }
    if (isError.isEmailError || isError.isPasswordError || isError.isFirstNameError || isError.isLastNameError || isError.isComfirmPasswordError) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }

    try {
      setSubmitFormError({ ...submitFormError, loading: true });
      const response = await axios.post(`${BackendUrl}/auth/signin`, formData);

      if (response?.data?.success) {
        setSubmitFormError({
          success: true,
          loading: false,
          error: false,
          isFormDataError: false,
        });
        navigate('/');
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
        <Box className={styles.contactTitle}>Sign Up</Box>
        <form onSubmit={handleSubmit}>
          <TextField
            error={isError.isFirstNameError}
            id="standard-error-helper-text"
            label="First Name"
            helperText={isError.isFirstNameError && "First name must be at least 4 characters long"}
            variant="standard"
            value={formData.firstName}
            onChange={(e) => handleChange(e, "first-name")}
            fullWidth
            margin="normal"
          />
          <TextField
            error={isError.isLastNameError}
            id="standard-error-helper-text"
            label="Last Name"
            helperText={isError.isLastNameError && "Last name must be at least 4 characters long"}
            variant="standard"
            value={formData.lastName}
            onChange={(e) => handleChange(e, "last-name")}
            fullWidth
            margin="normal"
          />
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
            helperText={isError.isPasswordError && "Password must be at least 4 characters long"}
            variant="standard"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            fullWidth
            margin="normal"
          />
          <TextField
            error={isError.isComfirmPasswordError}
            id="standard-error-helper-text"
            label="Confirm Password"
            helperText={isError.isComfirmPasswordError && "Passwords do not match"}
            variant="standard"
            type="password"
            value={formData.comfirmPassword}
            onChange={(e) => handleChange(e, "comfirm-password")}
            fullWidth
            margin="normal"
          />
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="outlined" color="success">
              Signup
            </Button>
          </Box>
          {submitFormError.success && (
            <Alert severity="success" color="success">
              Your application has been submitted successfully
            </Alert>
          )}
          {submitFormError.error && (
            <Alert severity="error" color="error">
              {errorMsg}
            </Alert>
          )}
          {submitFormError.isFormDataError && (
            <Alert severity="error" color="error">
              Please fill proper data
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}

