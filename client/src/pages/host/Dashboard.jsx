// src/pages/Host/Dashboard.jsx

import { useEffect, useState } from "react";
import HostProfilePanel from "../../components/HostProfilePanel";
import HostListings from "../../components/HostListings";
import AddNewListingButton from "../../components/AddNewListingButton";
import axios from "../../api/axios";

const HostDashboard = () => {
  const [hostData, setHostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`/host/dashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        // Structure the profile and listings
        const profile = {
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          about: data.extraInfo?.about || "No bio available",
          rating: data.extraInfo?.rating || "Not rated",
          image:
            data.extraInfo?.profileImage || "https://i.pravatar.cc/150?img=3",
        };

        const apartments = data.apartments || [];

        setHostData({ profile, apartments });
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchDashboardData();
    } else {
      setError("Unauthorized access");
      setLoading(false);
    }
  }, [userId, token]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading dashboard...
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!hostData)
    return (
      <div className="text-center py-10 text-gray-500">No data available.</div>
    );

  const { profile, apartments } = hostData;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* 🔲 TOP RECTANGLE */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side - Profile Info Panel */}
            <div className="md:col-span-1">
              <HostProfilePanel profile={profile} />
            </div>

            {/* Right Side - Listings and Button */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {/* Top Rectangle - Listings */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <HostListings listings={apartments} />
              </div>

              {/* Bottom Rectangle - Add Button */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-center">
                <AddNewListingButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
