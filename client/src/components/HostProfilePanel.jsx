import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axios';
import { FiEdit2 } from 'react-icons/fi';

const HostProfilePanel = ({ profile, onUpdated }) => {
  if (!profile) return null;

  const {
    name,
    email,
    phone = "Not provided",
    about = "No description",
    rating = "Not rated",
    image = "https://i.pravatar.cc/150?img=3",
  } = profile;

  const [avatar, setAvatar] = useState(image);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(name || '');
  const [aboutInput, setAboutInput] = useState(about || '');
  const [savingProfile, setSavingProfile] = useState(false);

  const apiOrigin = (axiosInstance.defaults?.baseURL || '').replace(/\/?api\/?$/, '') || 'http://localhost:5000';

  // Normalize initial avatar to absolute URL if backend returns relative path
  useEffect(() => {
    if (!image) return;
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
      setAvatar(image);
    } else {
      setAvatar(`${apiOrigin}${image.startsWith('/') ? '' : '/'}${image}`);
    }
  }, [image, apiOrigin]);

  const handlePick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const form = new FormData();
      form.append('images', file);
      form.append('userId', localStorage.getItem('userId') || '');
      const res = await axiosInstance.post('/host/upload-images', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res.data?.imageUrls?.[0];
      if (url) {
        const absolute = url.startsWith('/') ? `${apiOrigin}${url}` : url;
        setAvatar(absolute);
        // persist to user extra info so it survives reloads
        await axiosInstance.put('/host/profile-image', {
          userId: localStorage.getItem('userId'),
          url,
        });
      }
    } catch (err) {
      console.error('Profile image upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
        />
        <button
          onClick={handlePick}
          disabled={uploading}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-rose-500 text-white text-sm flex items-center justify-center shadow hover:bg-rose-600 disabled:opacity-50"
          title="Change photo"
        >
          {uploading ? '…' : <FiEdit2 size={14} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {!editing && (
        <>
          <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
            {name}
            <button
              className="text-gray-500 hover:text-gray-700"
              title="Edit profile"
              onClick={() => setEditing(true)}
            >
              <FiEdit2 size={14} />
            </button>
          </h2>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-sm text-gray-600">{phone}</p>
          <p className="mt-2 text-sm text-gray-700 italic">{about}</p>
          <p className="mt-2 text-sm font-medium text-yellow-500">⭐ {rating} rating</p>
        </>
      )}

      {editing && (
        <div className="mt-2 space-y-2 text-left">
          <label className="block text-xs text-gray-500">Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <label className="block text-xs text-gray-500 mt-2">About</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
            value={aboutInput}
            onChange={(e) => setAboutInput(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              className="px-3 py-1.5 rounded-full border text-xs hover:bg-gray-100"
              onClick={() => {
                setEditing(false);
                setNameInput(name);
                setAboutInput(about);
              }}
            >
              Cancel
            </button>
            <button
              disabled={savingProfile}
              className={`px-3 py-1.5 rounded-full text-white text-xs ${
                savingProfile ? 'bg-gray-300' : 'bg-rose-500 hover:bg-rose-600'
              }`}
              onClick={async () => {
                try {
                  setSavingProfile(true);
                  await axiosInstance.put('/host/profile', {
                    userId: localStorage.getItem('userId'),
                    name: nameInput,
                    about: aboutInput,
                  });
                  setEditing(false);
                  if (onUpdated) onUpdated({ name: nameInput, about: aboutInput });
                } catch (err) {
                  console.error('Failed to update profile', err);
                } finally {
                  setSavingProfile(false);
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostProfilePanel;
