import { Box, Button, Typography } from "@mui/material";
import MenuItem from "./MenuItem";
import { CiLogout } from "react-icons/ci";
import CreatePost from "./createPost";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { MouseEventHandler, useState } from "react";


const Sidebar = () => {
   const handleLogout: MouseEventHandler<HTMLAnchorElement> = (event) => {
      localStorage.clear();
    };
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingX: 3,
            paddingY:5,
            gap: 1,
         }}
      >
         <Typography variant="h4" fontWeight={800} color={"#04A51E"}>CIRCLE</Typography>
         <Box>
            <MenuItem />
         </Box>
         <Box>
            <CreatePost />
         </Box>
         <Link style={{textDecoration:"none",color:"white",marginTop:"10px"}} onClick={handleLogout} to={"auth/login"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: "auto", fontWeight: 500 }}>
               <CiLogout />
               <Typography sx={{ }}>Logout</Typography>
            </Box>
         </Link>
      </Box>
   );
};

export default Sidebar;
