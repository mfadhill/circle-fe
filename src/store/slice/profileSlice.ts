import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { myProfileAsync } from "../Asyncthunks/profileAsync";

const initialState: { profile: IAuthor } = {
    profile: {} as IAuthor,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        toggleFollow: (state, action: PayloadAction<string>) => {
            const userId: string | undefined = action.payload;
            const index = state.profile.following.findIndex(
                (following) => following.followingId === userId
            );

            if (index > -1) {
                // Unfollow pengguna
                state.profile.following.splice(index, 1);
            } else {
                // Follow pengguna
                state.profile.following.push({ followerId: state.profile.id!, followingId: userId });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(myProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(myProfileAsync.rejected, (_, action) => {
            console.log("rejected", action);
        });
        builder.addCase(myProfileAsync.pending, (_, action) => {
            console.log("pending", action);
        });
    },
});

export const { toggleFollow } = profileSlice.actions;

export default profileSlice.reducer;
