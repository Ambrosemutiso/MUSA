import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    chapter: "",
    university: "",
    admNumber: "",
    photo: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("personalInfo"); 
  const [editedUser, setEditedUser] = useState({}); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.officialmusamakueni.co.ke/user", {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://api.officialmusamakueni.co.ke/user",
        { ...editedUser },
        {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        }
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully.");
        setUser({ ...user, ...editedUser });
        setActiveTab("personalInfo");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4 text-blue-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-11 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            />
            <button
              className="absolute bottom-0 right-0 text-blue-600 p-1 rounded-full"
              title="Edit Photo"
            >
              ✎
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-700 mt-4">{user.name}</h2>
          <p className="text-gray-500">{user.id}</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-4 space-x-4">
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
    <i className="fab fa-facebook fa-lg"></i>
  </a>
  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
    <i className="fab fa-twitter fa-lg"></i>
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
    <i className="fab fa-instagram fa-lg"></i>
  </a>
  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
    <i className="fab fa-linkedin fa-lg"></i>
  </a>

        </div>

        {/* Tabs */}
        <div className="flex mt-6 border-b">
          <button
            onClick={() => setActiveTab("personalInfo")}
            className={`px-4 py-2 border-b-2 ${
              activeTab === "personalInfo"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("editProfile")}
            className={`px-4 py-2 border-b-2 ${
              activeTab === "editProfile"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-2 border-b-2 ${
              activeTab === "faqs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "personalInfo" && (
            <div className="grid gap-4">
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <p className="mt-1 p-2 border rounded bg-gray-100 w-full">
                    {value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "editProfile" && (
            <div className="grid gap-4">
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    defaultValue={value}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">FAQs</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </div>
              {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
