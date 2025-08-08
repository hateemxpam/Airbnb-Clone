import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const PhotosUpload = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 10); // Max 10 images
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleNext = async () => {
    if (images.length < 4) {
      alert('Please upload at least 4 photos.');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('❌ User not logged in. Please login again.');
      return;
    }

    const formData = new FormData();
    images.forEach((file) => {
      formData.append('images', file);
    });
    formData.append('userId', userId);

    try {
      setUploading(true);
      const res = await axios.post('/host/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrls = res.data.imageUrls;
      
      // Store image URLs in localStorage for the next step
      localStorage.setItem('uploadedImageUrls', JSON.stringify(imageUrls));
      
      alert('✅ Images uploaded successfully!');
      navigate('/host/home/description');
    } catch (err) {
      console.error('❌ Image upload failed:', err);
      alert('❌ Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-semibold">Add some photos of your place</h2>
        <p className="text-gray-500">
          You'll need at least 4 photos. You can add more or make changes later.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-rose-500 hover:text-rose-600"
          >
            <div className="text-4xl mb-2">📸</div>
            <p className="text-lg font-medium">Click to upload photos</p>
            <p className="text-sm text-gray-500">or drag and drop</p>
          </label>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate('/host/home/basic-info')}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={images.length < 4 || uploading}
            className={`px-6 py-3 rounded-full transition ${
              images.length >= 4 && !uploading
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {uploading ? 'Uploading...' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotosUpload;
