import {
  Box,
  Typography,
  Avatar,
  Button,
  Tab,
  ImageList,
  ImageListItem,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProfileAsync } from "../../../store/Asyncthunks/GetProfileAsync";
import { useParams } from "react-router-dom";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";
import ThreadCard from "../ThreadCard";
import { getThreadbyProfile } from "../../../store/Asyncthunks/getThreadProfileAsync";
import ModalEdit from "./component/modalEdit";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profileId } = useParams<{ profileId: string }>();

  useEffect(() => {
    dispatch(getProfileAsync(profileId));
    dispatch(getThreadbyProfile(profileId));
    dispatch(myProfileAsync());
  }, [dispatch, profileId]);

  const profile = useAppSelector((state) => state.getProfile);
  const profileLogin = useAppSelector((state) => state.profile);
  const threads = useAppSelector((state) => state.ThreadbyProfile.threads);

  const [value, setValue] = React.useState("1");
  const [imageArr, setImagesArr] = React.useState<any[]>([]);
  const [_, setFilterReply] = React.useState<any[]>([]);

  useEffect(() => {
    if (threads) {
      const filteredThreads = threads.filter(
        (thread) => thread.threadId === null
      );
      setFilterReply(filteredThreads);

      const images = filteredThreads
        .filter((thread) => thread.images && thread.images.length > 0)
        .flatMap((thread) => thread.images);

      setImagesArr(images);
    }
  }, [threads]);

  useEffect(() => {
    console.log([imageArr]);
  }, [imageArr]);


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      width={"100%"}
      sx={{
        bgcolor: "#1d1d1d",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        gap: "10px",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={"700"} padding={"10px"}>
          My Profile
        </Typography>
      </Box>
      <Box>
        <Box paddingX={"20px"}>
          <Box width={"100%"}>
            <img
              style={{ borderRadius: "10px" }}
              width="100%"
              height="150px"
              src={
                profile.detailProfile.profile?.cover
                  ? profile.detailProfile.profile.cover
                  : "https://images.unsplash.com/photo-1708660575990-101db3b00294"
              }
              alt="Cover"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar
                src={profile.detailProfile.profile?.photoProfile}
                sx={{
                  width: "80px",
                  height: "80px",
                  top: "-30px",
                  left: "5px",
                }}
                alt="Avatar"
              />
              {profile.detailProfile.id === profileLogin.profile.id ? (
                <ModalEdit
                  userId={profile.detailProfile.id!}
                  photoProfile={profile.detailProfile.profile?.photoProfile!}
                  cover={profile.detailProfile.profile?.cover!}
                  bio={profile.detailProfile.profile?.bio!}
                  username={profile.detailProfile.profile?.username!}
                  fullname={profile.detailProfile.fullname!}
                  key={profile.detailProfile.id!}
                />
              ) : (
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
                  Follow
                </Button>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {profile.detailProfile.fullname}
            </Typography>
            <Typography marginTop={1} variant="body2" fontWeight={500} color="gray">
              @{profile.detailProfile?.profile?.username}
            </Typography>
            <Typography fontWeight={400}>{profile.detailProfile.profile?.bio}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", mt: "15px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.detailProfile.following?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Following
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.detailProfile.follower?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Followers
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: "3px solid #04A51E",
              borderColor: "ActiveCaption",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChange}
              variant="fullWidth"
              sx={{ width: "100%" }}
              textColor="primary"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#04A51E",
                },
              }}
            >
              <Tab
                label="All Post"
                value="1"
                sx={{
                  padding: "20px",
                  "&.Mui-selected": {
                    color: "white",
                  },
                  borderBottom: "2px solid transparent",
                }}
              />
              <Tab
                label="Media"
                value="2"
                sx={{
                  padding: "20px",
                  "&.Mui-selected": {
                    color: "white",
                  },
                  borderBottom: "2px solid transparent",
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            {imageArr.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <Typography>No thread post yet</Typography>
              </Box>
            ) : (
              threads.map((item) => <ThreadCard key={item.id} thread={item} />)
            )}
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 2 }}>
            {imageArr.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <Typography>No media post yet</Typography>
              </Box>
            ) : (
              imageArr.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography>No thread post yet</Typography>
                </Box>
              ) : (
                <Box sx={{ padding: 0, display: "flex" }} >
                  <ImageList sx={{ width: "500" }}>
                    {imageArr.map((obj: any) => (
                      <ImageListItem key={obj.id}>
                        <img
                          srcSet={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          src={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                          alt={obj.id?.toString()}
                          loading="lazy"
                          style={{ height: "100%", overflow: "hidden", width: "100%" }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Profile;
