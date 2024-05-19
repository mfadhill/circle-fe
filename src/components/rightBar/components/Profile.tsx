import { Box, Typography, Avatar, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useEffect } from "react";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";

const Profile = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(myProfileAsync());
  }, []);

  return (
    <Box
      width={"450px"}
      height={"380px"}
      sx={{
        bgcolor: "#262626",
        display: "flex",
        flexDirection: "column",
        px: "20px",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={"700"} padding={"10px"}>
          My Profile
        </Typography>
      </Box>
      <Box>
        <Box>
          <Box width={"410px"}>
            <img
              style={{ borderRadius: "10px" }}
              width="100%"
              height="100px"
              src="https://s3-alpha-sig.figma.com/img/ff72/df09/d00360c5841aa3f95403eff20cb41f19?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=owG4eqbcoefMPo4LJLbhm-W6MahMUaSL22GPhKHLJU9ci9QihySvSgAU2-axwo1KqEvz1mw454kc3OzwiMKN9rOlb9jKEGXy1mPwJR806LWVkbnKEDVD6nVApPdzCOciND9dMyqaYtdwztJ~gJP-QuXzM9h9m~RwRwB3aCCJWQVGtYbgcHND~ukNIVDbHKUOxdbbnzTunYCjO0fkE-qWj6GaTchm7S-ONaXIoOOARD7ATyq5ktjOaso2R~Gl7QkAkfA278THrLPIKPmZtrv~dLhxhYPzGYSGoyBo2yIe0GReejQc6RXlSfYjzskk60610b2k6H340BWukJRt8wyBNQ__"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar
                sx={{
                  width: "80px",
                  height: "80px",
                  top: "-30px",
                  left: "5px",
                }}
              ></Avatar>
              <Button
                sx={{
                  height: "45px",
                  borderRadius: "10px",
                  border: "2px solid white",
                  color: "white",
                  fontWeight: 500,
                  px: 2,
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {profile.profile.fullname}
            </Typography>
            <Typography
              marginTop={1}
              variant="body2"
              fontWeight={500}
              color="gray"
            >
              @{profile.profile?.profile?.username}
            </Typography>
            <Typography fontWeight={400}>
              {profile.profile?.profile?.bio}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", mt: "15px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>0</Typography>
              <Typography fontWeight={400} color="gray">
                Following
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>0</Typography>
              <Typography fontWeight={400} color="gray">
                Followers
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
