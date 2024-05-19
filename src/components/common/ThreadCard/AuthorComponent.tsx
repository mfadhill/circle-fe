import React from "react";
import { IAuthor } from "../../../types/app";
import { Box, Typography } from "@mui/material";

interface IProps {
   author?: IAuthor;
}

const AuthorComponent: React.FC<IProps> = ({ author }) => {

   return (
      <Box
         sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
         }}
      >
         <Typography fontWeight={700}>{author?.fullname} </Typography>
         <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            @{author?.profile?.username}
         </Typography>
      </Box>
   );
};

export default AuthorComponent;
