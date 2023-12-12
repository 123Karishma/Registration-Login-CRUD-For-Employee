import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Typography, Modal, Alert, Stack, } from '@mui/material';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router";
import "./Style.css";





const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isname = (name) =>
    /^[A-Za-z]{4,12}$/i.test(name)

const isContact = (contact) =>
    /^[0-9]{9,11}$/i.test(contact);

const isaddress = (address) =>
    /^[A-Za-z0-9]{3,10}$/i.test(address);


const Employegrid = () => {

    const GetEmployeeData = async () => {
        await axios.get(EmployeUpUrl)
            .then((res) => { setData(res.data) })
            .catch((err) => console.log(err));
    }
    const [open, setOpen] = useState()
    const [Editopen, setEditopen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditopen = () => setEditopen(true)
    const handleEditclose = () => setEditopen(false)
    const navigate = useNavigate();


    //for name
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    //for error handling
    const [nameError, setnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    //  for validation

    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();

    const EmployeUpUrl = 'http://localhost:8000/studentgrid';

    const handlename = () => {
        if (!isname(name)
        ) {
            setnameError(true);
            return;
        }

        setnameError(false);
    };

    const handleEmail = () => {
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
    };

    const handleContact = () => {
        if (!isContact (contact)
        ) {
            setContactError(true);
            return;
        }

        setContactError(false);
    };

    const handlAddress = () => {
        if (!isaddress(address)) {
            setAddressError(true);
            return;
        }

        setAddressError(false);
    };

    const [data, setData] = useState([])

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 250,
        },
        {
            field: 'contact',
            headerName: 'Contact Number',
            width: 200,
        },
        { field: 'address', headerName: 'Address', width: 200 },
        {
            width: 250,
            field: "edit",
            headerName: "Actions",
            sortable: false,
            renderCell: (params) => (
                <>
            <Button
    size='sm'
    variant="contained"
    onClick={() => {
        handleEditopen();
        setId(params.row._id);
        editUserId(params.row._id);
    }}
>
    Edit
</Button>
<br>
</br>
                    <Button variant="contained" type='submit' onClick={() => {
                        handleDelete(params.row._id);
                    }}>
                        Delete
                    </Button>
                </>

            ),
        }




    ];
        debugger
        const [id, setId] = useState(null);
        const [useredit, setUseredit] = useState({ name: '', email: '', contact: '', address: '' });
    
        const editUserId = async (id) => {
            const result = await axios.get(`${EmployeUpUrl}/${id}`);
            const student = result.data.student;
            setUseredit(student);
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setUseredit({ ...useredit, [name]: value });
        };
    
        const handleUpdate = () => {
            axios.put(`${EmployeUpUrl}/${id}`, useredit)
                .then((response) => {
                })
                .catch((error) => {
                    // Handle errors
                    console.error(error);
                });
        };
    
    

    const handleDelete = async (Id) => {
        window.location.reload()
            axios.delete(`${EmployeUpUrl}/${Id}`, useredit).catch(console.error);
        GetEmployeeData();

    }
    const handleSubmit = () => {
        setSuccess(null);


        if (emailError || !email) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }

        if (contactError || !contact) {
            setFormValid("Contact should be  10 - 12 characters long. Please Re-Enter");
            return;
        }
        if (addressError || !address) {
            setFormValid("age should be 2 - 3 characters. Please Re-Enter");
            return;
        }


        const Credentials = { name, email, contact, address }
        axios.post(`${EmployeUpUrl}`, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 401) {
                    setFormValid(message);
                }
                else {
                    setSuccess("Signup in success full")
                    setSuccess(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    useEffect(() => {
        GetEmployeeData();
    }, [])

    const navigateing =()=>{
        navigate('/');
    }
    return (
        <>
        <div className='bodyback'>
        
            <div className='Header'>
                <h2  > Student Table </h2>
                <Button size='sm' variant="text"   onClick={navigateing} ><h4>Logout</h4></Button>
            </div>
            <div>
                <Button style={{ marginLeft: 200 }} variant="text" color="info" onClick={handleOpen}>
                    <h4>Add Employee Information</h4>
                </Button>
                <div style={{ height: 400, width: '70%', marginLeft: 200 }}>
                    <DataGrid
                        rows={data}
                        getRowId={data => data._id}
                        columns={columns}
                        pageSize={2}
                    />
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box 
                    maxWidth={400}
                    maxHeight={700}
                    justifyContent={"left"}
                    margin="auto"
                    id="standard-basic"
                    marginTop={10}
                    padding={3}
                    bgcolor="snow"
                    borderRadius={5}
                    >
                        <form>
                            <Typography variant='h3' padding={3} align="center">
                               <i> Add Details</i>
                            </Typography>

                            <TextField
                            label="Name"
                            fullWidth
                            error={nameError}
                            type='string'
                            variant="standard"
                            value={name}
                            helperText={nameError ? "First-Name should be 3 - 15 characters long and should be text .Please Re-Enter" : ''}
                            onBlur={handlename}
                            onChange={(event) => {
                            setName(event.target.value);
                            }}
                            />

                            <TextField
                                label="Email Address"
                                fullWidth
                                margin="dense"
                                error={emailError}
                                helperText={emailError ? "Email is Invalid" : ''}
                                variant="standard"
                                value={email}
                                onBlur={handleEmail}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />

                            <TextField
                                error={contactError}
                                fullWidth
                                label="Contact Number"
                                variant="standard"
                                value={contact}
                                helperText={contactError ? "Contact should be  10 - 12 characters long. Please Re-Enter" : ''}
                                onChange={(event) => {
                                    setContact(event.target.value);
                                }}
                                onBlur={handleContact}
                            />
                            <TextField
                                error={addressError}
                                fullWidth
                                label="Address"
                                variant="standard"
                                id="standard-basic"
                                margin="dense"
                                value={address}
                                helperText={addressError ? "age should be 2 - 3 characters" : ''}

                                onChange={(event) => {
                                    setAddress(event.target.value);
                                }}
                                onBlur={handlAddress}
                            />
                            <Button

                                variant="contained"
                                sx={{marginTop:3}}
                                type='submit'
                                fullWidth
                                onClick={handleSubmit}
                                marginTop={2}
                            >
                                Submit
                            </Button>
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

                        </form>


                    </Box>

                </Modal>
                <Modal
                    open={Editopen}
                    onClose={handleEditclose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ minWidth: 450, bgcolor: 'snowWhite', border: 2, margin: 'right', }}
                >

                    <Box display="flex"
                        flexDirection={"column"}
                        maxWidth={350}
                        justifyContent={"left"}
                        margin="auto"
                        marginTop={5}
                        padding={3}
                        bgcolor="snow"
                        borderRadius={5}
                    >
                        <form>
                            <Typography variant='h5' padding={3} align="center">
                              <i>  Edit Information</i>
                            </Typography>

                            <TextField
                                fullWidth
                                label="First Name"
                                id="standard-basic"
                                type={String}
                                variant="standard"
                                InputProps={{}}
                                margin="dense"
                                value={useredit.name}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Email Address"
                                fullWidth
                                margin="dense"
                                id="standard-basic"
                                variant="standard"
                                type={'email'}
                                InputProps={{}}
                                value={useredit.email} 
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label="Contact Number"
                                id="standard-basic"
                                type={'number'}
                                margin="dense"
                                variant="standard"
                                InputProps={{}}
                                value={useredit.contact} 
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                id="standard-basic"
                                variant="standard"
                                margin="dense"
                                InputProps={{}}
                                value={useredit.address}
                                onChange={handleChange}
        
                            />


                            <Box justifyContent={"right"} padding={2} marginTop={5}>
                                <Button variant="contained" fullWidth type='submit' onSubmit={ handleUpdate}> submit
                                </Button>
                            </Box>
                        </form>
                    </Box>

                </Modal>

            </div>
            </div>
        </>
    );

}
export default Employegrid;
