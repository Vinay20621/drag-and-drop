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
import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddModal from "../AddModal";
import EditModal from "../EditModel";
import { AuthContext } from "../../contex/AuthContex";
import DeleteModal from "../DeleteModal";
import moment from 'moment';
import OpenModel from "../OpenModel";

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
export default function TodoCard({ id, title, description, createdBy, updatedAt , setActiveCard}) {
  const [openEdit,setOpenEdit]=useState(false)
  const [openDeleteMode,setOpenDeleteModel]=useState(false)
  const [openTodo,setOpenTodo]=useState(false)
  const handleClose=()=>setOpenTodo(false)
  return (
    <Box style={{ display: "flex", justifyContent: "center" }} draggable onDragStart={()=>setActiveCard(id)} >
      <Card sx={{ width: 300 }} style={{ marginTop: "12px" }}>
        <CardActionArea>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{createdBy?.charAt(0)}</Avatar>}
            title={createdBy}
            subheader={`Updated on ${moment(updatedAt).format('MMM D, YYYY')}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description.slice(0,15)+ "..."}
            </Typography>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Box style={{ margin: "2px" }}>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => setOpenTodo(true)}
                >
                  View
                </Button>
              </Box>
              <Box style={{ margin: "2px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenEdit(true)}
                >
                  Edit
                </Button>
              </Box>
              <Box style={{ margin: "2px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => setOpenDeleteModel(true)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <EditModal title={title} description={description} createdBy={createdBy} id={id} open={openEdit}/>
      <OpenModel updatedAt={updatedAt} title={title} description={description} createdBy={createdBy} id={id} openTodo={openTodo} handleClose={handleClose}/>
      <DeleteModal id={id} openDeleteMode={openDeleteMode}/>
    </Box>
  );
}
