import { useEffect, useState } from "react";
import { auth } from "../Firebase.jsx";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase.jsx";

function Profile() {
  const [email, setEmail] = useState();
  const [name, setName] = useState("");

  const fetchUser = async () => {
    const user = auth.currentUser;
    const docRef = doc(db, "users", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setEmail(user?.email);
      fetchUser();
    });
  }, []);
  return (
    <div className="min-w-screen min-h-screen bg-blue-200 flex items-center justify-center">
      <div className="w-[50%] h-[20vh] border border-black flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="bg-pink-200 w-1/2 h-10 my-2 p-2">{name}</p>
          <p className="bg-pink-200 w-1/2 h-10 my-2 p-2">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
