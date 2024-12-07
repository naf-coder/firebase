import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../Firebase.jsx";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate("");
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "users", user.email), {
          name: name,
          email: email,
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("User info:", user);
        await setDoc(doc(db, "users", user.email), {
          name: user.displayName,
          email: user.email,
        });

        navigate("/profile");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  return (
    <div className="min-w-screen min-h-screen bg-blue-200 flex flex-col items-center justify-center">
      <form
        className="w-[50%] h-[50vh] border border-black flex flex-col justify-center items-center"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-1/2 my-2 rounded-lg p-2"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-1/2 my-2 rounded-lg p-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          className="w-1/2 my-2 rounded-lg p-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-1/2 my-2 rounded-lg p-2"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="p-2 bg-blue-800 text-white rounded-lg my-3"
          type="submit"
        >
          Submit
        </button>
      </form>

      <button
        className="p-2 bg-blue-400 text-white my-3 rounded-lg flex justify-center items-center"
        onClick={handleGoogleSignin}
      >
        <FaGoogle className="mr-2" />
        <p>Sign Up With Google</p>
      </button>

      <p className="text-white">
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
