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
  const navigate = useNavigate();

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
        alert("Registered Successfully");
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
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex flex-col items-center justify-center p-5">
      <form
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8 flex flex-col"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center mb-5 text-gray-700">
          Create an Account
        </h2>
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full mb-4 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full mb-4 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          className="w-full mb-4 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Register
        </button>
      </form>

      <button
        className="w-full max-w-md mt-4 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-red-700 transition duration-300"
        onClick={handleGoogleSignin}
      >
        <FaGoogle className="mr-2" />
        <p>Sign Up With Google</p>
      </button>

      <p className="text-white mt-5">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline text-blue-300 hover:text-blue-400"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
