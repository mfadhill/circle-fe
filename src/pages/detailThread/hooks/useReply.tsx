import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { API } from "../../../lib/api";
import { getThreadsAsync } from "../../../store/Asyncthunks/threadAsync";
import { getDetailThreadAsync } from "../../../store/Asyncthunks/getDetailThreadAsync";

interface IReplyForm {
    content: string;
    files: FileList | null;
}

interface IProps{
    threadId:string
}

const UsePostReply:any = ({threadId}:IProps) => {
    
    const [replyPost, setReplyPost] = useState<IReplyForm>({ content: "", files: null });
    const dispatch = useAppDispatch();
    const [posting,setPosting] = useState(false)

    const postReply = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            setPosting(true)
            const formData = new FormData();
            formData.append("content", replyPost.content);
            if (replyPost.files) {
                Array.from(replyPost.files).forEach((file) => {
                    formData.append("image", file); 
                });
            }

            const res = await API.post(`/threads/reply/${threadId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            dispatch(getThreadsAsync());
            dispatch(getDetailThreadAsync(threadId))
            setReplyPost({ content:"", files: null }); 
            console.log(res);
            setPosting(false)
        } catch (error) {
            console.error(error);
        }
    };

    return { replyPost, setReplyPost ,postReply,posting };
};

export default UsePostReply;
