// src/pages/Host/Dashboard.jsx

import { useEffect, useState } from "react";
import HostProfilePanel from "../../components/HostProfilePanel";
import HostListings from "../../components/HostListings";
import AddNewListingButton from "../../components/AddNewListingButton";
import HostDashboardNavbar from "../../components/HostDashboardNavbar";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-rose-50">
        <div className="text-center text-gray-500">Loading dashboard...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-white to-rose-50">
      {/* Navbar */}
      <HostDashboardNavbar />
      
      {/* Dashboard Content */}
      <div className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col gap-6">
          {/* Single professional card */}
          <div className="bg-white/85 backdrop-blur rounded-2xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left - Profile */}
              <div className="md:col-span-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile</h2>
                <div className="flex flex-col items-center">
                  <HostProfilePanel
                    profile={profile}
                    onUpdated={(partial) => {
                      setHostData((prev) => ({
                        ...prev,
                        profile: { ...prev.profile, ...partial },
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <HostListings
                    listings={apartments}
                    onDeleted={(id) => {
                      setHostData((prev) => ({
                        ...prev,
                        apartments: prev.apartments.filter((a) => a.id !== id),
                      }));
                    }}
                    onUpdatedListing={(updated) => {
                      setHostData((prev) => ({
                        ...prev,
                        apartments: prev.apartments.map((a) =>
                          a.id === updated.id ? { ...a, ...updated } : a
                        ),
                      }));
                    }}
                  />
                </div>
                <div className="mt-6 flex justify-center">
                  <AddNewListingButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
