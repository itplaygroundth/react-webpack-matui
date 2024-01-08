import * as React from 'react';
import {Button,Card,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide,FormControl,InputLabel,Input,FormHelperText,Stack} from '@mui/material'
 
import { TransitionProps } from '@mui/material/transitions';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@src/store';
import { UserInfo } from '@src/models/crypto_order';
import numeral from 'numeral'
import { createSignature, requestTime } from '@src/library';
import Swal from 'sweetalert2';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MemberDialog({open,onClose,members}:any) {
  //const [open, setOpen] = React.useState(state);
const initialRef = React.useRef();
const { register, handleSubmit, setValue , formState: { errors, isSubmitting }} = useForm();
const [balance,setBalance]  = React.useState(parseFloat(members.balance));
const {token} = members
//const {accessToken} = useUserStore((store:any) => store.user);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

// const onSubmit = (data) => {
//     console.log('Submitted Data:', data);
//     // ส่วนอื่น ๆ ที่ควรทำ
//   };

const updateUserData = async (values:any,accessToken:string) => {

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}` );
    // myHeaders.append("Accept","application/form-data");
    // myHeaders.append("'Content-Type","application/json'");
  
    var data =  {
      "amount":numeral(members.balance).value()+numeral(values.adjust).value(),
      "Sign": createSignature("UpdateBalance",requestTime),
      "RequestTime": requestTime
    }

    var requestOptions:RequestInit = {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${accessToken}`
      },
      cache: "no-cache",
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    
    return await fetch("https://wallet.tsxbet.net/api/Users/UpdateBalance", requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
  
        return data
        // if(data.status)
        // setUsers(data.data)
      })
   
    }
 

function onSubmit(values:any) {
    return new Promise(async (resolve) => {
      
    //resolve(onClose())
      
   
       await updateUserData(values,token).then((data:any)=>{
        resolve(onClose());
            Swal.fire({
                title: 'Signed in!',
                text: `Update Balance ${numeral(members.balance).value()+numeral(values.adjust).value()}`,
                icon: 'success',
                confirmButtonText: 'OK!',
              }).then((result) => {
              //  history.replace('/'); 
              //data.role = "admin"
              //setUser({username:data.username,accessToken:data.accessToken,role:data.role,isAuthenticated:true})
              //context.dispatch({ type: "LOGIN", payload: data })
              //@ts-ignore
              //const origin = location.state?.from?.pathname ;
              //console.log(location.state)
              
              //navigate(origin);
              //navigate("/")
            //history.push('/dashboard'); // Redirect to the dashboard after login
            setValue('adjust',0)
            
              })
         })
        
        
  
    });
  }
  const handleChange = (event:any) => {
    event.preventDefault(); 
    let currentBalance = balance+(1*event.target.value)
    setValue('balance', currentBalance)
   // setValue('amount',0)
  };
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    fullWidth
    aria-describedby="alert-dialog-slide-description"
  ><DialogTitle>{"User Information"}</DialogTitle>
  <form onSubmit={handleSubmit(onSubmit)}>
  <DialogContent>
  
  <DialogContentText id="alert-dialog-slide-description">
      
       <Stack spacing={2} direction="column" sx={{marginBottom: 4,marginTop: 4}}>
            <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input  ref={initialRef}  {...register('username')} id="username" name='username' aria-describedby="my-helper-text" value={members.username} readOnly/>
       </FormControl>
            <FormControl>
            <InputLabel htmlFor="balance">Adjust</InputLabel>
         <Input  ref={initialRef}  {...register('adjust')} id="adjust"  name='adjust' aria-describedby="my-helper-text"    
             onChange={(e)=>{ setBalance(numeral(members.balance).value()+(e.target.value?numeral(e.target.value).value():0))}}   sx={{input: {textAlign: "right"}}} /> 
             </FormControl>
             <FormControl>
            <InputLabel htmlFor="balance">Balance</InputLabel>
            <Input ref={initialRef}  {...register('balance')}  id="balance" name='balance' aria-describedby="my-helper-text" value={numeral(balance).value()}  readOnly   sx={{input: {textAlign: "right"}}}/>
            </FormControl>
          
        </Stack>
     
        </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button   sx={{marginRight: 2}}   type="submit" >Save</Button>
        <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
    </form>
    </Dialog>
  )
   
   
 
 
}
