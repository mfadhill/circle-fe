import { Box, Typography,Button, Avatar, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea"
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useEffect, useState } from "react";
import ThreadCard from "../../components/common/ThreadCard";
import { getThreads } from "../../lib/api/call/thread";
import { IThread } from "../../types/app";

const Home = () => {
   const [thread, setThread] = useState<IThread[]>([]);

   const fetchThread = async () => {
      try {
         const { data } = await getThreads();

         console.log(data);
         setThread(data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      fetchThread();
   }, []);

   return (
      <Box>
         <Typography variant="h5" marginLeft={2} marginTop={2}>
            {" "}Home
         </Typography>
         <Box  marginTop={1} marginBottom={2} sx={{px:"8px",py:"20px", borderBottom: "1px solid rgba(255, 255, 255, 0.6)"}}>
            <Box sx={{display:"flex",gap:2,alignItems:"center"}}>
               <Box marginLeft={1}>
                  <Avatar>

                  </Avatar>
               </Box>
               <Box width={"100%"}>
                  <TextField
                  sx={{width:"100%",background:"#1d1d1d",color:"white",
                     "& fieldset": { border: 'none' }
                  }}
                  placeholder="What is happening..."/>
               </Box>
               <Box>
                  <AddPhotoAlternateRoundedIcon fontSize="large" sx={{color:"#04A51E"}}/>
               </Box>
               <Box>
                  <Button  sx={{bgcolor:"#04A51E" ,color:"white",borderRadius:"20px",fontWeight:500,px:2}}>
                  Post
                  </Button>
               </Box>
            </Box>
         </Box>
         {thread &&
            thread.map((item) => <ThreadCard key={item.id} thread={item} />)}
      </Box>
   );
};

export default Home;
