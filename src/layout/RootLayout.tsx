import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Index from "../components/rightBar";
// import { useAppSelector } from "../store/store";

const RootLayout = () => {
   // const isLogin = useAppSelector((state)=>state.auth.isLogin)
   const token = localStorage.getItem("token")
  
  if ( !token ) {
    return(
      <Navigate to={"/auth/login"}/>
    )
  }
   return (
      <Box className="container">
         <Container
            className="container"
            sx={{
               margin:"auto",
               display: "flex",
               height: "100vh",
               width: "100%",
               color: "#fff",
            }}
         >
            <Box flex={1} sx={{}}>
               <Sidebar />
            </Box>
            <Box
               flex={2}
               className="thread-container"
               sx={{
                  borderLeft: "3px solid #3f3f3f",
                  borderRight: "3px solid #3f3f3f",
                  overflowY: "auto",
               }}
            >
               <Outlet />
            </Box>
            <Box flex={2} className="thread-container"  sx={{overflowY:"auto", display:"flex",flexDirection:"column",alignContent:"center", borderRadius:"20px",marginLeft:"20px",paddingY:"20px"}}>
               <Index/> 
            </Box>
         </Container>
      </Box>
   );
};

export default RootLayout;
