import logo from "../images/Contest.png";
import { TextField,Button } from "@mui/material";
import "../styles/form.css";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';



const Form = ({setUser}) => {
    const [userHandle,setuserHandle]=useState("");
    const saveHandler = () => {
        if(userHandle.trim().length!==0){
        setUser(userHandle);
            localStorage.setItem("user", userHandle);
        }
        else {
            alert("please enter valid name");
        }
    }
    return (
        <div className="form">
           
        <img src={logo} alt="logo" />
            <TextField
                onChange={(e)=>{setuserHandle(e.target.value)}}
                value={userHandle}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{background:"white",borderRadius:"50px"}} />
                      </InputAdornment>
                    ),
                }}
                size="large"
                variant="outlined"
                    focused
                    sx={{ input: { color: 'yellow' } }}
                style={{ background: "black", borderColor: "white", border: "30px" }}
                    label="Codeforces Username" color="primary" />
                <Button onClick={saveHandler} id="saveBtn" variant="contained" color="primary" style={{color:"black"}}>Save</Button>
               
    </div>
    );
}

export default Form;