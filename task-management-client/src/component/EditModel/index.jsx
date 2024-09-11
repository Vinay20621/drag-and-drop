import { Alert, Box, Button, Modal, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContex';
import axios from 'axios';
import styles from "./styles.module.css";
const BackendUrl = process.env.REACT_APP_BACKEND_URL;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function EditModal({id,description, createdBy,title,open=false}) {
    const [errorMsg,setErrorMsg]=useState("")
    const {openEditMode, setOpenEditModel}=useContext(AuthContext)
  const navigate = useNavigate();
  console.log({title})
  const [submitFormError, setSubmitFormError] = useState({
    success: false,
    loading: false,
    error: false,
    isFormDataError: false,
  });
  const [isError, setIsError] = useState({
    isTitleError: false,
    isDiscriptionError: false,
  });
  const [formData, setFormData] = useState({title,description});
  const handleChange = (e, value) => {
    if (value === "title") {
        setFormData({ ...formData, title: e.target.value });
        if (e.target.value.length < 10) {
          setIsError({ ...isError, isTitleError: true });
        } else {
          setIsError({ ...isError, isTitleError: false });
        }
    } else if (value === "discription") {
      setFormData({ ...formData, description: e.target.value });
      if (e.target.value.length < 10) {
        setIsError({ ...isError, isDiscriptionError: true });
      } else {
        setIsError({ ...isError, isDiscriptionError: false });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.length===0  || formData.description.length===0) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }
    if (isError.isDiscriptionError || isError.isTitleError) {
      setSubmitFormError({ ...submitFormError, isFormDataError: true });
      return;
    }

    try {
      setSubmitFormError({ ...submitFormError, loading: true });
      const response = await axios.put(`${BackendUrl}/todo/update-todo/${id}`, formData,
        {
            headers: {
              token: JSON.parse(localStorage.getItem("token")),
            },
          }
      );      

      if (response?.data?.success) {
        setSubmitFormError({
          success: true,
          loading: false,
          error: false,
          isFormDataError: false,
        });
        window.location.reload();
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
    <Modal
        open={open}
        onClose={() => setOpenEditModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box className={styles.contactTitle}>Edit Todo</Box>
        <form onSubmit={handleSubmit}>
          <TextField
            error={isError.isTitleError}
            id="standard-error-helper-text"
            label="Title"
            helperText={isError.isTitleError && "title must be at least 4 characters long "}
            variant="standard"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
            fullWidth
            margin="normal"
          />
           <TextField
            error={isError.isDiscriptionError}
            id="standard-error-helper-text"
            label="Discription"
            helperText={isError.isDiscriptionError && "title must be at least 10 characters long"}
            variant="standard"
            value={formData.description}
            onChange={(e) => handleChange(e, "discription")}
            fullWidth
            margin="normal"
          />

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="outlined" color="success">
              Save
            </Button>
          </Box>       

          {submitFormError.success && (
            <Alert severity="success" color="success">
              Added successful
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
      </Modal>
  )
}
