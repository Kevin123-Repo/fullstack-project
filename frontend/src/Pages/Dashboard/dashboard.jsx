import React, { useEffect, useState } from "react";
// import UpdateProfile from "./updateProfile";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
  
      try {
        const response = await fetch("http://localhost:3030/profile/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
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
        console.error("Error fetching user profile:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:3030/profile/user", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent if needed
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { profile: updatedProfile } = await response.json();
      
      // Update profile state only
      setProfile(updatedProfile);
  
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

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
            {/* <UpdateProfile profileData={profile} onUpdate={handleUpdate} /> */}
          </>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
