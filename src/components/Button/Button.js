import style from "./button.module.css";

export default function Button({ children, onClick, ...props }) {
  return (
    <button type="submit" className={style.btn} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
