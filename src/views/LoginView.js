import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logIn } from "../redux/auth/auth-operations";
import Button from "../components/Button";

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },
};

export default function LoginView({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("fill out the form");
      return;
    }

    dispatch(logIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            style={styles.label}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            style={styles.label}
          />
        </label>

        <Button onClick={onClick}>Log in</Button>
      </form>
    </div>
  );
}
