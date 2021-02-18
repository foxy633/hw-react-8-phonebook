import style from "./section.module.css";

export default function Section({ children }) {
  return <div className={style.section}>{children}</div>;
}
