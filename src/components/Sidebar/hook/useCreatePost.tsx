import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { API } from "../../../lib/api";
import { getThreadsAsync } from "../../../store/Asyncthunks/threadAsync";

interface IThreadForm {
    content: string;
    files: FileList | null;
}

const usePostThread:any = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [threadPost, setThreadPost] = useState<IThreadForm>({ content: "", files: null });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [posting,setPosting] = useState(false)
    const profile = useAppSelector((state) => state.profile);

    const postThread = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            setPosting(true)
            const formData = new FormData();
            formData.append("content", threadPost.content);
            if (threadPost.files) {
                Array.from(threadPost.files).forEach((file) => {
                    formData.append("image", file); 
                });
            }

            const res = await API.post("/threads", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            dispatch(getThreadsAsync());
            setThreadPost({ content: "", files: null }); 
            console.log(res);
            handleClose()           
            navigate("/");
            setPosting(false)
        } catch (error) {
            console.error(error);
        }
    };

    return { threadPost, setThreadPost,handleOpen,handleClose,open,setOpen, profile, postThread,posting };
};

export default usePostThread;
