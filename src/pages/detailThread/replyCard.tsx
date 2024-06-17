import { FC, useEffect, useState } from "react";
import { IAuthor, IReply } from "../../types/app";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import AuthorComponent from "../../components/common/ThreadCard/AuthorComponent";
import ImageComponent from "../../components/common/ThreadCard/ImageComponent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { API } from "../../lib/api";
import { useAppDispatch } from "../../store/store";
import { getThreadsAsync } from "../../store/Asyncthunks/threadAsync";
import { useNavigate } from "react-router-dom";
import { getDetailThreadAsync } from "../../store/Asyncthunks/getDetailThreadAsync";
import ModalEditThread from "../../components/common/ThreadCard/modalEditThread";
import ModalDeleteThread from "../../components/common/ThreadCard/modalDeleteThread";
import ModalDeleteReply from "./modalDeleteReply";
import ModalEditReply from "./modalEditReply";

interface IProps {
  reply: IReply;
  profile: IAuthor;
}

const ReplyCard: FC<IProps> = ({ reply, profile }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if the current user has liked the thread
    if (profile.id) {
      const userLike = reply.like.find((like) => like.userId === profile.id!);
      setIsLiked(Boolean(userLike));
    }
  }, [reply.like]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/thread/detail/${reply.id}`);
  };
  const handleLike = async () => {
    try {
      const { data } = await API.post(
        `/like/${reply.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update like state based on API response
      setIsLiked(data.like);
      dispatch(getThreadsAsync());
      if (reply.threadId) dispatch(getDetailThreadAsync(reply.threadId));
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
      <Avatar alt="ava" src={reply.author?.profile?.photoProfile} />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {profile?.id! == reply.author?.id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <AuthorComponent
              author={reply.author}
              createdAt={reply.createdAt}
            />
            <Box display={"flex"} gap={1}>
              <ModalDeleteReply reply={reply} key={reply.id!} />
              <ModalEditReply profile={profile} reply={reply} key={reply.id} />
            </Box>
          </Box>
        ) : (
          <AuthorComponent author={reply.author} createdAt={reply.createdAt} />
        )}
        <Typography>{reply.content}</Typography>
        {reply.images && reply.images.length > 0 && (
          <ImageComponent image={reply.images} />
        )}
        <Box
          sx={{ display: "flex", gap: "5px", alignItems: "center", mt: "10px" }}
        >
          <IconButton onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <Typography>{reply.like?.length}</Typography>
          <IconButton onClick={(e) => handleNavigate()}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography>{reply.reply?.length} reply</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyCard;
