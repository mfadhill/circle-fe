import { Box, Typography, Button, Avatar, TextField } from "@mui/material";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import ImageIcon from '@mui/icons-material/Image';
import React, { useEffect } from "react";
import ThreadCard from "../../components/common/ThreadCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getThreadsAsync } from "../../store/Asyncthunks/threadAsync";
import usePostThread from "../../components/Sidebar/hook/useCreatePost";

const Home = () => {
    const dispatch = useAppDispatch();
    const { threadPost, setThreadPost, profile, postThread,posting } = usePostThread();
    const thread = useAppSelector((state) => state.threads.thread);
    
    useEffect(() => {
        dispatch(getThreadsAsync());
    }, [dispatch]);
    return (
        <Box>
            <Typography variant="h5" marginLeft={2} marginTop={2}>
                Home
            </Typography>
            <Box marginTop={1} marginBottom={2} sx={{ px: "8px", py: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.6)" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box marginLeft={1}>
                        <Avatar src={profile.profile.profile?.photoProfile} />
                    </Box>
                    <Box width={"100%"}>
                        <TextField
                            sx={{ width: "100%", background: "#1d1d1d", color: "white", "& fieldset": { border: 'none' } }}
                            value={threadPost.content}
                            placeholder="What is happening..."
                            onChange={(e) => setThreadPost({ ...threadPost, content: e.target.value })}
                        />
                    </Box>
                    <Box>
                        <label htmlFor="contained-button-file">
                            {!threadPost.files?.length ? (
                                <AddPhotoAlternateRoundedIcon fontSize="large" sx={{ color: "#04A51E" }} />
                            ) : (
                                <Typography color={"#04A51E"} sx={{display:"flex",justifyContent:"center"}} fontWeight={700} variant="h6">
                                    {threadPost.files.length}<ImageIcon sx={{ color: "#04A51E" }} />
                                </Typography>
                            )}
                        </label>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            hidden
                            onChange={(e) => setThreadPost({ ...threadPost, files: e.target.files })}
                        />
                    </Box>
                    <Box>
                        <Button disabled={posting} sx={{ bgcolor: "#04A51E", color: "white", borderRadius: "20px", fontWeight: 500, px: 2 }} onClick={postThread}>
                            Post
                        </Button>
                    </Box>
                </Box>
            </Box>
            {thread && thread.map((item) => <ThreadCard key={item.id} thread={item} />)}
        </Box>
    );
};

export default Home;
