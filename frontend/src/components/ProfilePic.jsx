import React, { useState } from 'react';
import { HiOutlineCamera } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { updateProfilePicture } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducer';
import { stables } from '../constant';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';



const ProfilePic = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [photo, setPhoto] = useState(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (photo?.url) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => updateProfilePicture({ token, formData }),
    onSuccess: (data) => {
      setPhoto(null); // Reset photo state
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile photo updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Update failed');
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Only images allowed');
      return;
    }
    
    if (file.size > 1 * 1024 * 1024) { // 1MB
      toast.error('File must be <1MB');
      return;
    }

    setPhoto({ url: URL.createObjectURL(file), file });
  };

  const handleUpload = () => {
    if (!photo) return;
    
    const formData = new FormData();
    formData.append("ProfilePicture", photo.file);
    
    mutate({ 
      token: userState.userInfo.token, 
      formData 
    });
  };

  const handleDelete = () => {
    if (!window.confirm("Delete profile photo?")) return;
    
    const formData = new FormData();
    formData.append("profilePicture", ""); // Clear image
    
    mutate({ 
      token: userState.userInfo.token, 
      formData 
    });
  };

  return (
    <div className="w-full flex items-center gap-x-4">
      <div className="relative w-20 h-20 rounded-full outline outline-offset-2 outline-1 outline-primary overflow-hidden">
        <label
          htmlFor="profilePicture"
          className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
        >
          {photo?.url || avatar ? (
            <img
              src={photo?.url || `${stables.UPLOAD_FOLDER_BASE_URL}/${avatar}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
              <HiOutlineCamera className="w-7 h-auto text-primary" />
            </div>
          )}
        </label>
        <input
          type="file"
          className="sr-only"
          id="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex gap-2">
        {photo && (
          <button
            onClick={handleUpload}
            className="border border-green-500 rounded-lg px-5 py-2 text-green-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        )}
        
        {!photo && avatar && (
          <button
            onClick={handleDelete}
            className="border border-red-500 rounded-lg px-4 py-2 text-red-500 disabled:opacity-50"
            disabled={isLoading}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePic;