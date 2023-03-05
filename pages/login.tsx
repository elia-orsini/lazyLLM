import { useState } from "react";
import useUser from "@utils/useUser";

const Login = ({ page }) => {
  // here we just check if user is already logged in and redirect to admin
  const { mutateUser } = useUser({
    redirectTo: "/chatGptBattle",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      password: e.currentTarget.password.value,
    };

    const userData = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const user = await userData.json();

    try {
      await mutateUser(user);
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-auto">
      <label>
        Enter password
        <input type="password" name="password" required className="border border-black mx-3" />
      </label>

      <button type="submit" className="bg-black text-white px-4">
        Login
      </button>

      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
};

export default Login;
