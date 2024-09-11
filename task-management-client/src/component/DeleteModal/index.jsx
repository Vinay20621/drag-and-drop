import React, { useContext } from 'react'
import { AuthContext } from '../../contex/AuthContex'
import { Box, Button, Modal, Typography } from '@mui/material'
import styles from "./styles.module.css";
import axios from 'axios';
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
export default function DeleteModal({id, openDeleteMode}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${BackendUrl}/todo/delete-todo/${id}`,
        {
            headers: {
              token: JSON.parse(localStorage.getItem("token")),
            },
          }
      );      

      if (response?.data?.success) {
        window.location.reload();
      } 
    } catch (error) {
     
    }
  };
  return (
    <Modal
        open={openDeleteMode}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Todo Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to Delete?
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={(e) => handleSubmit(e)}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
  )
}
