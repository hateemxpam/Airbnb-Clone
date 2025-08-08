import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // Adjust the import path as needed
import { useListing } from "../../context/ListingContext";

const PhotosUpload = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { updateListing } = useListing();

  const userId = localStorage.getItem("userId"); // ✅ Get logged-in user ID

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10); // Max 10 images
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleUpload = async () => {
    if (images.length < 4) {
      alert("Please upload at least 4 photos.");
      return;
    }

    if (!userId) {
      alert("❌ User not logged in. Please login again.");
      return;
    }

    const formData = new FormData();

    images.forEach((file) => {
      formData.append("images", file); // must match backend field name
    });

    formData.append("userId", userId); // ✅ Attach userId to backend

    try {
      setUploading(true);

      const res = await axios.post("/host/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrls = res.data.imageUrls;

      // ✅ Store temporarily in localStorage for later apartment submission
      localStorage.setItem("uploadedImageUrls", JSON.stringify(imageUrls));
      // ✅ Save to context
      updateListing("imageUrls", imageUrls);
      navigate("/host/home/description"); // Move to next step
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      alert("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
    console.log("Userid", userId);
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-semibold">
          Add some photos of your house
        </h2>
        <p className="text-gray-500">
          You’ll need 4–5 photos to get started. You can add more or make
          changes later.
        </p>

        {/* Preview Selected Images */}
        <div className="flex flex-wrap gap-4">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`Upload ${idx}`}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
          ))}
        </div>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="border px-4 py-2 rounded-md file:mr-4 file:py-2 file:px-4 file:border-none file:bg-rose-100 file:text-rose-600 file:rounded-md"
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/host/home/basic-info")}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-6 py-3 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotosUpload;
