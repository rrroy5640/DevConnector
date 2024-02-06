import { setAlert, removeAlert } from "./redux/alertSlices";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const useAlert = () => {
  const dispatch = useDispatch();

  const showAlert = ({ msg, alertType }) => {
    const id = uuid();

    dispatch(setAlert({ id, msg, alertType }));
    setTimeout(() => {
      dispatch(removeAlert(id));
    }, 5000);
  };
  const hideAlert = (id) => dispatch(removeAlert(id));

  return { showAlert, hideAlert };
};

export default useAlert;
