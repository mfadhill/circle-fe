import { Box, Typography } from "@mui/material";
import MenuItem from "./MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { authSlice } from "../../store/slice/authSlice";
import { CiLogout } from "react-icons/ci";
import CreatePost from "./createPost";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout =  () => {
     // Clear localStorage
  localStorage.clear();

  // Update Redux state
  dispatch(authSlice.actions.LOGIN({ token: "", profile: {} }));

  // Reload page to ensure state and localStorage updates take effect
  window.location.reload();

  // Optional: Use navigate hook to navigate to login page
  navigate('/auth/login');
};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingX: 3,
        paddingY: 5,
        gap: 1,
      }}
    >
      <Typography variant="h4" fontWeight={800} color={"#04A51E"}>
        CIRCLE
      </Typography>
      <Box>
        <MenuItem />
      </Box>
      <Box>
        <CreatePost />
      </Box>
      <Link
        to={"/auth/login"}
        style={{ textDecoration: "none", color: "white", marginTop: "10px" }}
        onClick={handleLogout}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginTop: "auto",
            fontWeight: 500,
          }}
        >
          <CiLogout />
          <Typography sx={{}}>Logout</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Sidebar;
