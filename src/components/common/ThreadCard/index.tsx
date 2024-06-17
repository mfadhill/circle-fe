import { FC, useEffect, useState } from "react";
import { IThread } from "../../../types/app";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import AuthorComponent from "./AuthorComponent";
import ImageComponent from "./ImageComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { API } from "../../../lib/api";
import { useAppDispatch } from "../../../store/store";
import usePostThread from "../../Sidebar/hook/useCreatePost";
import { getThreadsAsync } from "../../../store/Asyncthunks/threadAsync";
import { Link, useNavigate } from "react-router-dom";
import ModalEditThread from "./modalEditThread";
import ModalDeleteThread from "./modalDeleteThread";

interface IProps {
  thread: IThread;
}

const ThreadCard: FC<IProps> = ({ thread }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { profile } = usePostThread(thread.id);

  useEffect(() => {
    // Check if the current user has liked the thread
    if (profile.profile?.id) {
      const userLike = thread.like.find(
        (like) => like.userId === profile.profile.id
      );
      setIsLiked(Boolean(userLike));
    }
  }, [thread.like]);

  const navigate = useNavigate();
  const handleLike = async () => {
    try {
      const { data } = await API.post(
        `/like/${thread.id}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  if (thread.threadId != null) return null;
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
      <Avatar alt="ava" src={thread.author?.profile?.photoProfile} />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {profile?.profile?.id == thread.author?.id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <AuthorComponent
              author={thread.author}
              createdAt={thread.createdAt}
            />
            <Box display={"flex"} gap={1}>
              <ModalDeleteThread thread={thread} key={thread.id!} />
              <ModalEditThread
                profile={profile.profile}
                thread={thread}
                key={thread.id}
              />

            </Box>
          </Box>
        ) : (
          <AuthorComponent
            author={thread.author}
            createdAt={thread.createdAt}
          />
        )}
        <Box>
          <Typography>{thread.content}</Typography>
          {thread.images && thread.images.length > 0 && (
            <ImageComponent image={thread.images} />
          )}
        </Box>
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
          <Typography>{thread.like?.length}</Typography>
          <IconButton onClick={(e) => navigate(`thread/detail/${thread.id}`)}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography>{thread.reply?.length} reply</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadCard;
