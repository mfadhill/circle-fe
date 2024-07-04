import { Box, Typography, Avatar, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";

const Widget = () => {
    return (
        <Box
            width={"100%"}
            sx={{
                bgcolor: "#262626",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                padding: "10px"
            }}
        >
            <Box padding={"10px"} sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" fontWeight={"700"} paddingX={"10px"}>
                    Developed by Reihan {" "} • {" "}
                    <Link style={{ textDecoration: "none" }} to={"https://github.com/mfadhill"} ><GitHubIcon sx={{ color: "white" }} fontSize="small" /></Link >
                    <Link style={{ textDecoration: "none" }} to={"https://www.linkedin.com/in/muhammad-fadhil-5a324027b/"}><LinkedInIcon sx={{ color: "white" }} fontSize="small" /></Link >
                    <Link style={{ textDecoration: "none" }} to={"#"}><FacebookIcon sx={{ color: "white" }} fontSize="small" /></Link >
                    <Link style={{ textDecoration: "none" }} to={"https://www.instagram.com/_mfadhill20/"}><InstagramIcon sx={{ color: "white" }} fontSize="small" /></Link >
                </Typography>
                <Typography variant="body2" fontSize={"small"} color="grey" fontWeight={500} paddingX={"10px"}>
                    Powered by  Dumbways {" "}  <img width={"24px"} height={"15px"} src="../../../public/dwlogo.png" />  {" "}
                    <br /> Indonesia • #1 Codding Bootcamp
                </Typography>
            </Box>
        </Box>
    );
};

export default Widget;
