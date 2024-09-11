import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import TodoCard from "../../component/Card";
import { AuthContext } from "../../contex/AuthContex";
import axios from "axios";
import AddModal from "../../component/AddModal";
import { useNavigate } from "react-router-dom";
const BackendUrl = process.env.REACT_APP_BACKEND_URL;
function Heading({ heading }) {
  return (
    <Box style={{ textAlign: "center", background: "blue", color: "white" }}>
      <Typography variant="h5">{heading}</Typography>
    </Box>
  );
}

export default function Home() {
  const { openAddMode, setOpenAddModel } = useContext(AuthContext);
  const [allTodo, setAllTodo] = useState([]);
  const [activeCard,setActiveCard]=useState(null)
  const navigate=useNavigate()
  

  const getTodoData = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/todo/get-all-todo`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      
      if (response?.data?.success) {
        setAllTodo(response?.data?.todos);
      }
    } catch (error) {
      console.error("Error fetching todos", error);
      navigate("/")
    }
  };
const handleDropLeave=async(value)=>{
  try {
    const response = await axios.put(`${BackendUrl}/todo/update-todo-status/${activeCard}`, {
      status:value
    },
      {
          headers: {
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
    );  
    if (response?.data?.success) {
      window.location.reload();
    }
    setActiveCard(null)
  } catch (error) {
    console.error("Error fetching todos", error);
  }
}
  useEffect(() => {
    getTodoData();
  }, []);
const handleLogout=async()=>{
  try {
    const response = await axios.get(`${BackendUrl}/auth/logout`
    );  
    localStorage.removeItem("token")
    if (response?.data?.success) {
      window.location.reload();
    }
    navigate("/")
  } catch (error) {
    console.error("Error fetching todos", error);
  }
}
  return (
    <Box style={{ margin: "22px" }}>
     
      <Box style={{ display: "flex", justifyContent: "space-around" , marginBottom:"22px"}}>
        <Button
          type="submit"
          variant="outlined"
          color="success"
          size="large"
          onClick={() => setOpenAddModel(true)}
        >
          Add Todo
        </Button>
        <Button
          type="submit"
          variant="outlined"
          color="success"
          onClick={() => handleLogout()}          
          size="large"
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* TODO Column */}
        <Grid item md={4} className={styles.contactForm} onDragLeave={()=>handleDropLeave("todo")}>
          <Heading heading="TODO" /> 
          {allTodo
            .filter((todo) => todo.status === "todo")
            .map((todo) => (
              <TodoCard
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                createdBy={todo.createdBy?.firstName}
                updatedDate={todo.updatedAt}
                setActiveCard={setActiveCard}
              />
            ))}
        </Grid>

        {/* IN PROGRESS Column */}
        <Grid item md={4} className={styles.contactForm} onDragLeave={()=>handleDropLeave("in-progress")}>
          <Heading heading="IN PROGRESS" />
          {allTodo
            .filter((todo) => todo.status === "in-progress")
            .map((todo) => (
              <TodoCard
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                createdBy={todo.createdBy?.firstName}
                updatedDate={todo.updatedAt}
                setActiveCard={setActiveCard}
              />
            ))}
        </Grid>

        {/* DONE Column */}
        <Grid item md={4} className={styles.contactForm} onDragLeave={()=>handleDropLeave("done")}>
          <Heading heading="DONE" />
          {allTodo
            .filter((todo) => todo.status === "done")
            .map((todo) => (
              <TodoCard
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                createdBy={todo.createdBy?.firstName}
                updatedDate={todo.updatedAt}
                setActiveCard={setActiveCard}
              />
            ))}
        </Grid>
      </Grid>

      <AddModal />
    </Box>
  );
}
