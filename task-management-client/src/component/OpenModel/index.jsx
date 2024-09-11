import React, { useContext } from 'react'
import { AuthContext } from '../../contex/AuthContex'
import styles from "./styles.module.css";
import {
    Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import moment from 'moment';

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

export default function OpenModel({title,description, createdBy, id,openTodo,updatedAt,handleClose}) {
  return (
   
    <Modal
        open={openTodo}
        // onClose={() => setOpenModel(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
         <Box sx={style}>
        <Card style={{ marginTop: "12px",width:"100%",height:"100%" }}>
        <CardActionArea>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{createdBy.charAt(0)}</Avatar>}
            title={title}
            subheader={`Updated on ${moment(updatedAt).format('MMM D, YYYY')}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Box style={{ margin: "2px" }}>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => handleClose()}
                >
                  Close
                </Button>
              </Box>
              
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      </Box>
      </Modal>
  )
}
