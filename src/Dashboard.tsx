// src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import { existsUser } from "./api/clerk.js";
import { useAuth } from "@clerk/clerk-react"; // Example: Assuming you're using Clerk for authentication

const Dashboard = () => {
  const { userId } = useAuth(); // Fetch the current session (token) from Clerk
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      console.log("Fetching user data for user ID:", userId);
      const fetchData = async () => {
        try {
          const data = await existsUser(userId);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.displayName}</h1>
          <p>Email: {userData.email}</p>
          <img src={userData.photoURL} alt="User Profile" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
