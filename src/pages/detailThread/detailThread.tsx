import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import ImageIcon from "@mui/icons-material/Image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../index.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getDetailThreadAsync } from "../../store/Asyncthunks/getDetailThreadAsync";
import { API } from "../../lib/api";
import { myProfileAsync } from "../../store/Asyncthunks/profileAsync";
import ThreadCard from "../../components/common/ThreadCard";
import UsePostReply from "./hooks/useReply";
import ReplyCard from "./replyCard";

function DetailThread() {
  const Params = useParams();
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const detailThread = useAppSelector((state) => state.getDetailThread.thread);
  const profile = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();

  const threadId = Params.threadId;

  React.useEffect(() => {
    dispatch(getDetailThreadAsync(threadId || ""));
    dispatch(myProfileAsync());
  }, [dispatch, threadId]);

  React.useEffect(() => {
    if (detailThread && profile) {
      const findId = detailThread.like?.some(
        (like) => like.userId === profile.id
      );
      setIsLiked(findId);
    }
  }, [detailThread, profile]);

  const { replyPost, setReplyPost, postReply, posting } = UsePostReply({ threadId });

  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const { data } = await API.post(
        `/like/${detailThread.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked(data.like);
      dispatch(getDetailThreadAsync(threadId || ""));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "start",
        width: "100%",
        px: "20px",
        height: "100vh",
      }}
    >
      <IconButton onClick={() => navigate("/")}>
        <HighlightOffRoundedIcon fontSize={"large"} />
      </IconButton>
      {detailThread.images && detailThread.images.length > 0 ? (
        <Box flex={3} sx={{ width: "50%", height: "100%" }}>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {detailThread.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.imageUrl}
                  alt={`Slide ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : null}
      <Box
        flex={detailThread.images && detailThread.images.length > 0 ? 2 : 1}
        sx={{
          width: "100%",
          height: "100%",
          borderLeft:
            detailThread.images && detailThread.images.length > 0
              ? "1px solid grey"
              : "none",
          borderRight: "1px solid grey",
          marginLeft:
            detailThread.images && detailThread.images.length > 0
              ? "20px"
              : "0",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"top"}
          sx={{
            padding: "10px 20px",
            gap: "20px",
            borderBottom: "1px solid grey",
          }}
        >
          <Avatar src={detailThread.author?.profile?.photoProfile} />
          <Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography fontWeight={700}>
                {detailThread.author?.fullname}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                @{detailThread.author?.profile?.username}
              </Typography>
            </Box>
            <Typography marginTop={1}>{detailThread.content}</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                mt: "10px",
              }}
            >
              <IconButton onClick={handleLike}>
                {isLiked ? (
                  <FavoriteIcon fontSize="small" color="error" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
              <Typography>{detailThread.like?.length}</Typography>
              <IconButton>
                <CommentOutlinedIcon />
              </IconButton>
              <Typography>{detailThread.reply?.length} reply</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            padding: "10px 20px",
            gap: "20px",
            borderBottom: "1px solid grey",
          }}
        >
          <Avatar src={profile?.profile?.photoProfile} />
          <TextField
            sx={{
              width: "100%",
              color: "white",
              "& fieldset": { border: "none" },
            }}
            value={replyPost.content}
            onChange={(e) =>
              setReplyPost({ ...replyPost, content: e.target.value })
            }
            placeholder="Type Your Reply !"
          />
          <Box>
            <label htmlFor="contained-button-file">
              {!replyPost.files?.length ? (
                <AddPhotoAlternateRoundedIcon
                  fontSize="large"
                  sx={{ color: "#04A51E" }}
                />
              ) : (
                <Typography
                  color={"#04A51E"}
                  sx={{ display: "flex", justifyContent: "center" }}
                  fontWeight={700}
                  variant="h6"
                >
                  {replyPost.files.length}
                  <ImageIcon sx={{ color: "#04A51E" }} />
                </Typography>
              )}
            </label>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              hidden
              onChange={(e) =>
                setReplyPost({ ...replyPost, files: e.target.files })
              }
            />
          </Box>
          <Button
            sx={{
              bgcolor: "#04A51E",
              color: "white",
              borderRadius: "20px",
              fontWeight: 500,
              px: 2,
            }}
            disabled={posting}
            onClick={postReply}
          >
            Post
          </Button>
        </Box>
        <Box
          className="hide-scrollbar"
          sx={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)", 
          }}
        >
          {detailThread.reply?.map((reply) => (
            <Box
              key={reply.id}
              sx={{
                borderTop: "1px solid grey",
                borderBottom: "1px solid grey",
              }}
            >
              <ReplyCard reply={reply} profileId={profile?.id!} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default DetailThread;
