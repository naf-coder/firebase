import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("Login successfully");
        navigate("/profile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error", error);
      });
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-blue-200 flex flex-col items-center justify-center">
        <div className="w-[50%] h-[40vh] border border-black flex flex-col justify-center items-center">
          <input
            type="email"
            placeholder="Enetr your Email"
            className="w-1/2 my-2 p-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-1/2 my-2 p-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="p-2 bg-blue-800 text-white rounded-lg my-3"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <button className="p-2 bg-black text-white rounded-lg my-3">
          <Link to={"/register"}>Sign up</Link>
        </button>
      </div>
    </>
  );
}

export default LoginPage;
