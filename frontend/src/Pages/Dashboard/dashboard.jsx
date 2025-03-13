import React, { useEffect, useState } from "react";
import UpdateProfile from "./updateProfile";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
      setLoading(true);
  
      try {
        const response = await fetch("http://localhost:3030/profile/user", {
          method: "GET",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        //console.log('Full Response:', data);

        // Set only the profile state
        const { profile } = data; 
        setProfile(profile);  // Set profile state only

      } catch (error) {
        console.error("Error fetching profile profile:", error.message);
      } finally {
        setLoading(false);
      }
    }
  

 // Empty dependency array means this effect runs once when the component mounts

 useEffect(() => {
  fetchProfile();
}, []);
  

  // Only render once profile data is available
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="dashboard-container">
        {profile ? (
          <>
            <h1 className="dash-heading">
              Welcome {profile.first_name} {profile.last_name}!
            </h1>
            <UpdateProfile profileData={profile} onUpdate={fetchProfile} />
          </>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
