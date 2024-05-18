import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { Ilogin } from "../../../../lib/validation/useLoginValidate";
import { useAppDispatch } from "../../../../store/store";
import { loginAsync } from "../../../../store/Asyncthunks/authAsync";
interface IProps {
   reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
   const dispatch = useAppDispatch();

   const onSubmit: SubmitHandler<Ilogin> = (data) => {
      console.log(data);
      dispatch(loginAsync(data));
      reset();
   };

   const onErrorSubmit: SubmitErrorHandler<Ilogin> = (data) => {
      console.log(data);
   };

   return {
      onSubmit,
      onErrorSubmit,
   };
};