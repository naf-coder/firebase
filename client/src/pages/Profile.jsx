import { useEffect, useState } from "react";
import { auth } from "../Firebase.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

function Profile() {
  const [email, setEmail] = useState();
  const [name, setName] = useState("");

  const fetchUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setEmail(user?.email || "Guest");
      fetchUser();
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          User Profile
        </h2>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-blue-100 rounded-lg flex justify-between items-center">
            <span className="text-gray-500 font-medium">Name:</span>
            <span className="text-gray-700 font-semibold">{name || "N/A"}</span>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg flex justify-between items-center">
            <span className="text-gray-500 font-medium">Email:</span>
            <span className="text-gray-700 font-semibold">
              {email || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
