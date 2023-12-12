import React, { useState } from "react";
import "./Style1.css";
import {
  TextField,
  Box,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar'; 



const RagisterUrl = 'http://localhost:2000/signup';

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isName= ( Username)=>
/^[A-Za-z]{4,12}$/i.test(Username)

const ispassword= ( password)=>
/^[0-9A-Za-z]{8,12}$/i.test(password)


export default function RagisterUser() {

  const [Username, setuserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Confirmpassword, setConfirmPassword] = useState();

  const [UsernameError, setuserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
 const [ConfirmpasswordError, setConfirmPasswordError] = useState(false);

 
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();



  const handleUsername = () => {
    if (!isName(Username)) {
      setuserNameError(true);
      return;
    }

    setuserNameError(false);
  };

  const handleEmail = () => {
    console.log(isEmail(email));
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (!ispassword(password)
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleConfirmpassword = () => {
    if (password!==Confirmpassword
    ) {
      setConfirmPasswordError(true);
      return;
    }

    setConfirmPasswordError(false);
  };

  const handleSubmit = () => {
    setSuccess(null);

    if (UsernameError || !Username) {
      setFormValid(
        "User Name should be 4-12 characters long. Please Re-Enter"
      );
      return;
    }

    if (emailError || !email) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !password) {
      setFormValid("Password should be 5 - 20 characters. Please Re-Enter");
      return;
  }
  
  if (ConfirmpasswordError || !Confirmpassword) {
      setFormValid("ConfirmPassword is not match to password. Please Re-Enter");
      return;
  }
  
  if (password !== Confirmpassword) {
      setFormValid("Password and ConfirmPassword do not match. Please Re-Enter");
      return;
  }
    const RagisterUser = { Username, email, password, Confirmpassword }
    axios.post(`${RagisterUrl}`,RagisterUser)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
            if (status ===401) {
                setFormValid(message);
            }
            else {
       
                setSuccess("Signup in success full")
                navigate("/")
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })

  };

  const navigateLogin =()=>{
    navigate('/');
  }

  return (
    <>
    <div className="backbody">
    <h6>.</h6>

        <Box       
                          maxWidth={400}
                        maxHeight={700}
                        margin="auto"
                        id="standard-basic"
                        marginTop={5}
                        marginLeft={40}
                        padding={3}
                        color={"white"}
                        bgcolor={"whitesmoke"}
                        borderRadius={5}
                        borderColor={"black"}
                        >
      <div >
      <div className="avtar">
      <Avatar className="Avatar"
        alt="Remy Sharp"
        src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
        sx={{ width: 100, height: 100 }}
        style={{ border: "2px solid gray", margin: 30 ,alignitems: "center", display: "flex"}} 
      />
      </div>
      <h1 className="Topper">Welcome To  Family</h1> 
        <TextField
          error={UsernameError}
          fullWidth
          helperText={UsernameError? "User Name should be 10-12 characters long. Please Re-Enter" : ''}
          label="User Name"
          variant="standard"
          value={Username}
          InputProps={{}}
          onChange={(event) => {
            setuserName(event.target.value);
          }}
          onBlur={handleUsername}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
          helperText={emailError? "Email is Invalid. Please Re-Enter" : ''}
          variant="standard"
          value={email}
          InputProps={{}}
          onBlur={handleEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Password"
          fullWidth
          type="password"
          error={passwordError}
          helperText={passwordError ? "Password should be 5 - 20 characters. Please Re-Enter" : ''}
          variant="standard"
          value={password}
          InputProps={{}}
          onBlur={handlePassword}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Confirm password"
          fullWidth
          error={ConfirmpasswordError}
          variant="standard"
          type="password"
          value={Confirmpassword}
          InputProps={{}}
          helperText={ConfirmpasswordError? "Password is not match.  Please Re-Enter" : ''}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
      </div>


      <div style={{ marginTop: "10px" }}>
        <Button
        className="button"
        color="primary"
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          SIGNUP
        </Button>
      </div>

      {formValid && (
        <Stack  spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
          </Alert>
        </Stack>
      )}

      {success && (
        <Stack spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "12px", color:"black" }} margin="left">
       <p> Do you have an account ? <Button onClick={navigateLogin}> LOGIN</Button> </p>
      </div>
      </Box>
    </div>
    </>
  );
}




