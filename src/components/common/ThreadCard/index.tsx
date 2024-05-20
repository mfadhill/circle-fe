import { FC, useEffect, useState } from "react";
import { IAuthor, IThread } from "../../../types/app";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import AuthorComponent from "./AuthorComponent";
import ImageComponent from "./ImageComponent";
import { DEFAULT_AVA } from "../../../utils/constant/defaultAva";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { API } from "../../../lib/api";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import usePostThread from "../../Sidebar/hook/useCreatePost";

interface IProps {
  thread: IThread;
}

const ThreadCard: FC<IProps> = ({ thread }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(thread.like.length);
  const dispatch = useAppDispatch()
  const {profile} = usePostThread()



  useEffect(() => {
    // Check if the current user has liked the thread
    if (profile.profile?.id) {
      const userLike = thread.like.find(like => like.userId === profile.profile.id);
      setIsLiked(Boolean(userLike));
    }
  }, [thread.like]);

  const handleLike = async () => {
    try {
      const { data } = await API.post(`/like/${thread.id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Update like state based on API response
      setIsLiked(data.like);
      setLikeCount(data.like ? likeCount + 1 : likeCount - 1);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        paddingX: 2,
        borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        py: 1,
      }}
    >
      <Avatar alt="ava" src={thread.author.profile?.photoProfile ?? DEFAULT_AVA} />
      <Box
        sx={{
          width: "100%",
        }}
      >
        <AuthorComponent author={thread.author} />
        <Typography>{thread.content}</Typography>
        {thread.images && thread.images.length > 0 && (
          <ImageComponent image={thread.images} />
        )}
        <Box sx={{ display: "flex", gap: "5px", alignItems: "center", mt: "10px" }}>
          <IconButton onClick={handleLike}>
            {isLiked ? <FavoriteIcon fontSize="small" color="error" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography>
            {likeCount}
          </Typography>
          <IconButton>
            <CommentOutlinedIcon/>
          </IconButton>
          <Typography>
            {thread.reply.length}  reply
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadCard;
