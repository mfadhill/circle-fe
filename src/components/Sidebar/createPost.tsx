import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton, TextField } from '@mui/material';
import { Textarea } from '@mui/joy';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

 const CreatePost = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                <IconButton onClick={handleClose} color='inherit' sx={{padding:"0"}}>
                    <CancelOutlinedIcon fontSize='small'/>
                </IconButton>
            </Box>
            <Box sx={{display:"flex",gap:2,alignItems:"start",justifyContent:"center"}}marginTop={1} paddingX={2}>
               <Box marginLeft={1}>
                  <Avatar>

                  </Avatar>
               </Box>
               <Box width={"100%"}>
               <TextField
                  sx={{width:"100%",background:"#1d1d1d",color:"white",
                     "& fieldset": { border: 'white' }
                  }}
                  placeholder="What is happening..."/>
               </Box>
            </Box>
            <Box sx={{width:"95%",display:"flex",margin:"auto",justifyContent:"space-between",borderTop: "1px solid rgba(255, 255, 255, 0.6)"}}paddingY={2} paddingX={3}>
                <Box>
                  <AddPhotoAlternateOutlined fontSize="medium" sx={{color:"#04A51E"}}/>
               </Box>
               <Box>
                  <Button  sx={{bgcolor:"#04A51E" ,color:"white",borderRadius:"20px",fontWeight:500,px:2}}>
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