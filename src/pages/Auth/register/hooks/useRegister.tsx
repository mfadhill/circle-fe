import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../../store/store";
import { registerAsync } from "../../../../store/Asyncthunks/authAsync";
import { Iregister } from "../../../../lib/validation/useRegisterValidate";
import { useNavigate } from "react-router-dom";


interface IProps {
   reset: () => void;
}

export const useRegisterFunction = ({ reset }: IProps) => {
    const navigate = useNavigate()
   const dispatch = useAppDispatch();

   const onSubmit: SubmitHandler<Iregister> = (data) => {
      console.log(data);
      dispatch(registerAsync(data));
      reset();
      navigate("/auth/login")
   };

   const onErrorSubmit: SubmitErrorHandler<Iregister> = (data) => {
      console.log(data);
   };

   return {
      onSubmit,
      onErrorSubmit,
   };
};