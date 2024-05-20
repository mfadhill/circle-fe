import { Box, Typography, Avatar, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { FC, useEffect } from "react";
import { IAuthor } from "../../../types/app";
import { getSuggestedAsync } from "../../../store/Asyncthunks/suggestedAsync";

interface IProps {
    profile: IAuthor;
}

const Suggested: FC<IProps> = ({ profile }) => {
    const dispatch = useAppDispatch();
    const suggested = useAppSelector((state) => state.suggested.Author);

    useEffect(() => {
        dispatch(getSuggestedAsync());
    }, [dispatch]);

    const findFollow =(followingId:string) =>{
        return followingId === profile.id
    }

    // Ensure suggested is always an array
    const suggestions = Array.isArray(suggested) ? suggested : [];

    return (
        <Box
            width={"450px"}
            sx={{
                bgcolor: "#262626",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                padding:"10px"
            }}
        >
            <Box padding={"10px"}>
                <Typography variant="h6" fontWeight={"700"} padding={"10px"}>
                    Suggested For You
                </Typography>
            </Box>
            <Box>
                {suggestions.map((suggest) => (
                    <Box key={suggest.id} padding={"10px"} sx={{ display: "flex",padding:"10px", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={suggest.profile?.photoProfile} />
                            <Box sx={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
                                <Typography variant="body1" fontWeight={700}>
                                    {suggest.fullname}
                                </Typography>
                                <Typography variant="body2" color="grey" fontWeight={300}>
                                    @{suggest.profile?.username}
                                </Typography>
                            </Box>
                        </Box>
                        <Button sx={{ color: "white", border: "2px solid white", borderRadius: "20px" }}>
                            follow
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Suggested;
