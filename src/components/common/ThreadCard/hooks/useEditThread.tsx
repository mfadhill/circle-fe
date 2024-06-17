import React from "react";
import { API } from "../../../../lib/api";
import { useAppDispatch } from "../../../../store/store";
import { getThreadsAsync } from "../../../../store/Asyncthunks/threadAsync";
import { getDetailThreadAsync } from "../../../../store/Asyncthunks/getDetailThreadAsync";
import { getThreadbyProfile } from "../../../../store/Asyncthunks/getThreadProfileAsync";
import { useNavigate } from "react-router-dom";

interface IThreadForm {
  content: string;
  files: FileList | null;
  oldImageUrl:string
}

interface IProps {
  threadId: string;
  initialState: {
    content: string;
    files: FileList | null;
  };
  authorId:string
}

const useEditThread = ({ threadId, initialState ,authorId}: IProps) => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setThreadEdit({ content: "", files: null, oldImageUrl: "" }); // Reset state ketika modal ditutup
  };

  const [posting, setPosting] = React.useState(false);
  const [threadEdit, setThreadEdit] = React.useState<IThreadForm>({
    ...initialState,
    oldImageUrl: "",
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (initialState.files && initialState.files.length > 0) {
      const imageUrl = URL.createObjectURL(initialState.files[0]);
      setThreadEdit((prev) => ({ ...prev, oldImageUrl: imageUrl }));
    }
  }, [initialState.files]);

  const editThread = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setPosting(true);
      const formData = new FormData();
      formData.append("content", threadEdit.content);

      if (threadEdit.files) {
        Array.from(threadEdit.files).forEach((file) => {
          formData.append("image", file);
        });
      }
      
      const res = await API.put(`/threads/${threadId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });


      dispatch(getThreadbyProfile(authorId));
      dispatch(getDetailThreadAsync(threadId));
      dispatch(getThreadsAsync());
      setThreadEdit({ content: "", files: null, oldImageUrl: "" }); 
      handleClose();
      window.location.reload();

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setPosting(false);
    }
  };
  
  const deleteThread = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await API.delete(`/threads/${threadId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(getThreadbyProfile(authorId));
      dispatch(getDetailThreadAsync(threadId));
      dispatch(getThreadsAsync());
      handleClose();
      window.location.reload();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    open,
    handleOpen,
    handleClose,
    posting,
    threadEdit,
    setThreadEdit,
    editThread,
    deleteThread,
  };
};

export default useEditThread;
