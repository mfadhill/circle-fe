import { Box, Typography,Button, TextField } from "@mui/material"
import UseRegisterValdate from "../../../../lib/validation/useRegisterValidate"
import { Link, Navigate } from "react-router-dom"
import { Controller } from "react-hook-form"
import { useAppSelector } from "../../../../store/store"
import { useEffect, useState } from "react"
import { useRegisterFunction } from "../hooks/useRegister"

const Register = () => {
    const [isRegisterSuccess, setisRegisterSuccess] = useState<boolean>(false)
    const authState = useAppSelector((state) => state.auth);

   const { control, reset, handleSubmit } = UseRegisterValdate();
   const { onErrorSubmit, onSubmit } = useRegisterFunction({ reset });

   useEffect(() => {
      console.log(authState);
   }, [authState]);
  return (
    <Box sx={{Width:"100vh",display:"flex",justifyContent:"center",paddingTop:"150px"}}>
       <Box sx={{display:"flex",flexDirection:"column"}}>
        <Box>
            <Typography variant="h3" fontWeight={700} color={"#04A51E"}>
                    Circle
                </Typography>
            </Box>
            <Box>
            <Typography variant="h5" fontWeight={700}>
                    Login To Circle
                </Typography>
            </Box>
            <form>
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Box sx={{height:"30px" }}>
                    <Box sx={{display:"flex",flexDirection:"column", marginY:"20px",gap:"10px"}}>
                    <Controller
                        control={control}
                        name="fullname"
                        render={({ field, fieldState }) => (
                            <TextField
                                
                                label="fullname *"
                                color="success"
                                sx={{ borderColor: "white",color:"white" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                            )}
                        />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <TextField
                                
                                label="Email *"
                                color="success"
                                sx={{ borderColor: "white",color:"white" }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Password *"
                                    color="success"
                                    sx={{ borderColor: "white" }}
                                    {...field}
                                    helperText={fieldState.error?.message}
                                    error={Boolean(fieldState.error)}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                    </Box>
                    
                    <Button onClick={handleSubmit(onSubmit ,onErrorSubmit)} sx={{width:"400px",mb:"5px",bgcolor:"#04A51E",borderRadius:"10px"}}
                    >
                        <Typography color={"white"}>
                            Register
                        </Typography>
                    </Button>
                    <Box>
                    <Typography>
                            Alredy Have Account ?<Link style={{textDecoration:"none",color:"#04A51E",marginLeft:"10px"}} to={"/auth/login"}>Login
                            </Link>
                    </Typography>
                    </Box>
                    </Box>
                </Box>
            </form>
           
        </Box>
    </Box>
  )
}

export default Register