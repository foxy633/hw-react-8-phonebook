import styles from "./filter.module.css";
import { useSelector, useDispatch} from "react-redux";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import * as actions from "../../redux/contacts/contacts-actions";

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = (event) =>
    dispatch(actions.changeFilter(event.target.value));
  return (
    <div className={styles.filter_text}>
      Find contacts by name:
      <input
        className={styles.filter_input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

