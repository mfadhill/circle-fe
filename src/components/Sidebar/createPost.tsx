import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton, TextField,Typography } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../store/store';
import { getThreadsAsync } from '../../store/Asyncthunks/threadAsync';
import { myProfileAsync } from '../../store/Asyncthunks/profileAsync';
import usePostThread from './hook/useCreatePost';



 const CreatePost = () => {
  const dispatch = useAppDispatch();
    const { open,handleOpen,handleClose,threadPost, setThreadPost, profile, postThread } = usePostThread();

    React.useEffect(() => {
        dispatch(getThreadsAsync());
        dispatch(myProfileAsync());
    }, [dispatch]);
  return (
    <Box>
      <Button 
       onClick={handleOpen} sx={{width:"100%",bgcolor:"#04A51E" ,color:"white",borderRadius:"20px",mt:2,fontWeight:500,px:2}}
      >Created Post
      </Button>
       <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={{padding:"15px 0px",
        borderRadius:"5px",
        color:"white",
        bgcolor:"#1d1d1d",
        position:"absolute" as "absolute",
        top:"25%",
        left:"50%",
        transform: 'translate(-50%, -50%)',
        width:"500px",
        height:"177px"}}>
            <Box textAlign={"end"} >
                <IconButton onClick={handleClose} color='inherit' sx={{paddingX:"20px"}}>
                    <CancelOutlinedIcon fontSize='small'/>
                </IconButton>
            </Box>
            <Box sx={{display:"flex",gap:2,alignItems:"start",justifyContent:"center"}}marginTop={1} paddingX={2}>
               <Box marginLeft={1}>
                  <Avatar src={profile.profile.profile?.username}>

                  </Avatar>
               </Box>
               <Box width={"100%"}>
               <TextField
               sx={{ width: "100%", background: "#1d1d1d", color: "white", "& fieldset": { border: 'none' } }}
               value={threadPost.content}
               placeholder="What is happening..."
               onChange={(e) => setThreadPost({ ...threadPost, content: e.target.value })}
               />
               </Box>
            </Box>
            <Box sx={{width:"95%",display:"flex",margin:"auto",justifyContent:"space-between",borderTop: "1px solid rgba(255, 255, 255, 0.6)"}}paddingY={2} paddingX={3}>
            <Box>
                        <label htmlFor="contained-file">
                            {!threadPost.files?.length ? (
                                <AddPhotoAlternateOutlined fontSize="large" sx={{ color: "#04A51E" }} />
                            ) : (
                                <Typography color={"#04A51E"} fontWeight={700} variant="h6">
                                    {threadPost.files.length}
                                </Typography>
                            )}
                        </label>
                        <input
                            accept="image/*"
                            id="contained-file"
                            multiple
                            type="file"
                            hidden
                            onChange={(e) => setThreadPost({ ...threadPost, files: e.target.files })}
                        />
                    </Box>
               <Box>
                  <Button onClick={postThread } sx={{bgcolor:"#04A51E" ,color:"white",borderRadius:"20px",fontWeight:500,px:2}}>
                  Post
                  </Button>
               </Box>
            </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CreatePost