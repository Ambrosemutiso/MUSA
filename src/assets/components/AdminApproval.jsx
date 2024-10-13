import React, { useEffect, useState } from 'react';

const AdminApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    // Fetch pending users from the backend
    fetch('https://api.officialmusamakueni.co.ke/pendingusers')  // Make sure this matches your backend route
      .then((res) => res.json())
      .then((data) => setPendingUsers(data))
      .catch((error) => console.error("Error fetching pending users:", error));
  }, []);

  const approveUser = async (id) => {
    try {
        const response = await fetch(`https://api.officialmusamakueni.co.ke/approveuser/${id}`, {
            method: 'POST',
        });

        const data = await response.json();
        if (data.success) {
            alert(data.message);
            // Refresh the list by filtering out the approved user
            setPendingUsers(pendingUsers.filter((user) => user.id !== id));
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error approving user:", error);
    }
};


  const rejectUser = async (id) => {
    try {
      const response = await fetch(`https://api.officialmusamakueni.co.ke/rejectuser/${id}`, {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        // Refresh the list by filtering out the rejected user
        setPendingUsers(pendingUsers.filter((user) => user.id !== id));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Pending Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray border border-green-700 shadow-md">
          <thead>
            <tr className="bg-green-700">
              <th className="py-3 px-4 text-left font-medium text-white">Name</th>
              <th className="py-3 px-4 text-left font-medium text-white">Email</th>
              <th className="py-3 px-4 text-left font-medium text-white">Phone</th>
              <th className="py-3 px-4 text-left font-medium text-white">ID</th>
              <th className="py-3 px-4 text-left font-medium text-white">Chapter</th>
              <th className="py-3 px-4 text-left font-medium text-white">University</th>
              <th className="py-3 px-4 text-left font-medium text-white">TransactionID</th>
              <th className="py-3 px-4 text-left font-medium text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phoneNumber}</td>
                <td className="py-3 px-4">{user.idNumber}</td>
                <td className="py-3 px-4">{user.chapter}</td>
                <td className="py-3 px-4">{user.university}</td>
                <td className="py-3 px-4">{user.transaction}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => approveUser(user._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => rejectUser(user._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pendingUsers.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No pending users at the moment.</p>
      )}
    </div>
  );
};

export default AdminApproval;
