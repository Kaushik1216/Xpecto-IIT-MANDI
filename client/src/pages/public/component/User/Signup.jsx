import { Button, Grid } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import React from 'react'
import {TextField} from '@mui/material'
import style from "./signup.module.css"
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
       const user=useSelector((state)=>state.userinfo);
       const navigate=useNavigate();
  const [newdata,setnewdata]=useState(user)
   const nav=()=>[
       navigate("/")
   ]
   const savecurrentuser=async()=>{
       try{   
              const url = `${process.env.REACT_APP_BACKENDURL}/api/user/signup`;
              const  data  = await axios.post(url,{
                user:user.email,
                data:newdata
              });
              nav();
         }catch{
              console.log("data saved sifnufreb");
        }
   }

  const signupchange=({currentTarget:input})=>{
    setnewdata({...newdata,[input.name]:input.value});
  }
  return (
    <>
    <div  className={style.container}>
    <div className={style.signform} >
       <div className={style.formstyle}>
    <h1>Register</h1>
    <Stack component="form" >
       <Grid container  onSubmit={savecurrentuser}>
       {/* <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2} color="yellow">  <TextField   id="outlined-basic" size="small" label="Firstname" value={user.firstname} onChange={signupchange}name="firstname"variant="outlined" disabled/>
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center" padding={2}>  <TextField id="outlined-basic" required size="small" label="Lastname" value={newdata.lastname} onChange={signupchange}name="lastname"variant="outlined" />
</Grid> */}
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" size="small" label="Email" value={user.email} onChange={signupchange}name="email"variant="outlined" disabled/>
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" required size="small" label="Phonenumber" value={newdata.phonenumber} onChange={signupchange}name="phonenumber"variant="outlined" />
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" required size="small" label="Collegename" value={newdata.collegename} onChange={signupchange}name="collegename"variant="outlined" />
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" required size="small" label="Degree" value={newdata.degree} onChange={signupchange}name="degree"variant="outlined" />
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" required size="small" label="Branch" value={newdata.branch} onChange={signupchange}name="branch"variant="outlined" />
</Grid>
       <Grid  item xs={12}sm={6} md={6}display="flex" justifyContent="center" alignItems="center"padding={2}>  <TextField id="outlined-basic" required size="small" label="Referral-code" value={newdata.referralcode} onChange={signupchange}name="referralcode"variant="outlined" />
</Grid>
       <Grid  item xs={12}sm={12} md={12}display="flex" justifyContent="center" alignItems="center"padding={2}>  <Button onClick={savecurrentuser} variant="outlined" >Register</Button>
</Grid>

       </Grid>
    </Stack>
    </div>
    </div>
    </div>
    </>
  )
}
