import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Stack,
  Box
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./LoginStyle.css";
import axios from 'axios';
import Avatar from '@mui/material/Avatar'; 

const LoginUrl = 'http://localhost:4000/login';


const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);


export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();


  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handleSubmit = () => {
    setSuccess(null);

    const LoginUser = { email, password };
    axios.post(LoginUrl, LoginUser)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
    
            if (status === 200) {
                setSuccess("Login Successful");
                navigate("/Employee");
                window.location.reload();
            } else if (status === 401) {
                setFormValid(message);
            } else {
                // Handle other status codes if needed
                console.log("Unhandled status code:", status);
            }
        })
        .catch(err => {
            console.log(err);
        });
  };

  const navigateRagistration = () => {
    navigate('/Ragistration');
  };

  return (
        <>
        <div className="backgroundbody">
          <h6>.</h6>
      
                <Box    maxWidth={400}
                        maxHeight={800}
                        justifyContent={"left"}
                        margin="auto"
                        id="standard-basic"
                        marginTop={15}
                        marginLeft={40}
                        padding={3}
                        bgcolor="snow"
                        borderRadius={5}>

      <div >
      <div className="avtar">
      <Avatar 
        alt="Remy Sharp"
        src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
        sx={{ width: 110, height: 110 }}
        style={{ border: "2px solid gray", margin: 30 ,alignitems: "center", display: "flex"}} 
      />
      </div>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          variant="standard"
          value={email}
          helperText={emailError? "Email is Invalid. Please Re-Enter" : ''}
          size="small"
          onBlur={handleEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="password"
          type="password"
          fullWidth
          error={passwordError}
          helperText={passwordError ? "Password should be 5 - 20 characters. Please Re-Enter" : ''}
          variant="standard"
          value={password}
          size="small"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>


      <div style={{ marginTop: 10 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>

      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "12px" }} margin="left">
        <p>Forgot Password</p>
        <p>you want to create new account <Button onClick={navigateRagistration}>SIGNUP</Button></p>

      </div>
      </Box>
      </div>
    </>
  );
}
