import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import {userBoundery, newUserDetails, Role} from "../interfaces"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import axios from "axios";

interface ResponsiveDialogProps{
    setUser:(user:userBoundery)=>void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      '& svg': {
        margin: theme.spacing(1.5),
      },
      '& hr': {
        margin: theme.spacing(0, 0.5),
      },
    },
    title: {
        width:"100%",
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }),
);

const signUp = (signUpEmail:string, signUpUserName:string, signUpAvatar:string, cb:Function)=>{
    const newUser:newUserDetails = {
        email:signUpEmail,
        username:signUpUserName,
        avatar:signUpAvatar,
        role:Role[Role.PLAYER]
    }
    console.log("sending to server: ", newUser)
    axios.post("http://localhost:8080/twins/users",
        newUser
              ).then(res=>{console.log(res)
              cb(res.data)})
}

export default function ResponsiveDialog({setUser}:ResponsiveDialogProps) {
    //dialog open/ close
  const [open, setOpen] = React.useState(false);
  //sign in detailes
  const [signInEmail, setSignInEmail] = React.useState<string>("")
  //sign up details
  const [signUpEmail, setSignUpEmail] = React.useState<string>("")
  const [signUpUserName, setSignUpUserName] = React.useState<string>("")
  const [signUpAvatar, setSignUpAvatar] = React.useState<string>("")

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
      <div style={{marginLeft:"auto"}} >
        <Button  onClick={handleClickOpen} color="inherit">Login</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
          <Grid className={classes.root}>
              <MuiDialogTitle className={classes.title} id="responsive-dialog-title">Sign In
      {handleClose ? (
          <span style={{marginLeft:"auto"}}>
          <IconButton style={{marginLeft:"auto"}} aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
          </span>
      ) : null}
              </MuiDialogTitle>
        <DialogContent>
          <DialogContentText>
              Please fill your Email
          </DialogContentText>
              <span style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"center", gap:"10px"}} >
            <TextField style={{width:"80%", margin:"auto"}} label='Email' value={signInEmail} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSignInEmail(e.target.value)}/>
              </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
              Sign In
          </Button>
        </DialogActions>
  <Divider orientation="vertical" flexItem />
              <DialogTitle id="responsive-dialog-title">{"Sign Up"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Please fill your Email, UserName and Avatar (image url)
          </DialogContentText>
        </DialogContent>
              <span style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"center", gap:"10px"}} >
                  <TextField style={{width:"80%", margin:"auto"}} label='Email' value={signUpEmail} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSignUpEmail(e.target.value)}/>
            <TextField style={{width:"80%", margin:"auto"}} label='username' value={signUpUserName} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSignUpUserName(e.target.value)}/>
            <TextField style={{width:"80%", margin:"auto"}} label='avatar' value={signUpAvatar} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSignUpAvatar(e.target.value)}/>
</span>
        <DialogActions>
            <Button onClick={()=>{
                signUp(signUpEmail, signUpUserName, signUpAvatar, (user:userBoundery)=>{
                    setUser(user)
                handleClose()})}} color="primary" autoFocus>
                Submit
          </Button>
        </DialogActions>
</Grid>
      </Dialog>
    </div>
  );
}

