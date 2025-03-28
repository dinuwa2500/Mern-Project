import React, { useEffect, useMemo } from 'react';
import MainLayout from '../../components/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateProfile } from '../../../services/userService';
import ProfilePic from '../../components/ProfilePic';
import { userActions } from '../../store/reducers/userReducer';
import { FiArrowLeft, FiCamera, FiSave } from 'react-icons/fi';

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);

    const { data: profileData, isLoading: isProfileLoading, isError: isProfileError, error } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: userState.userInfo.token });
        },
        queryKey: ['profile'],
    });

    const registrationYear = profileData?.createdAt ? new Date(profileData.createdAt).getFullYear() : "N/A";

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, mobilenumber, address }) => {
            console.log("Mutation Data:", { name, mobilenumber, address }); // Log the data to check
            return updateProfile({ token: userState.userInfo.token, userData: { name, mobilenumber, address } , userId: userState.userInfo._id });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success("Profile updated successfully");

            console.log("User :", data);
            // Redirect or show success message
        },
        onError: (error) => {
            toast.error(error.message); 
            console.error("Error registering user:", error);
        }
    });

    useEffect(() => {
        if (!userState.userInfo) {
            toast.promise(
                new Promise((resolve) => resolve("User registered successfully")),
                {
                    loading: "Registering...",
                    success: "User registered successfully",
                    error: "Registration failed. Please try again.",
                    duration: 4000, 
                }
            ).then(() => {
                navigate("/"); 
            });
        }
    }, [userState.userInfo, navigate]);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: "",
            mobilenumber: "",
            address: "",
        },
        values: useMemo(() =>{
            return {
                name: isProfileLoading ? "" : profileData?.name,
                mobilenumber: isProfileLoading ? "" : profileData?.mobilenumber,
                address: isProfileLoading ? "" : profileData?.address,
            };
        }, [profileData?.name, profileData?.mobilenumber, profileData?.address]),
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const {name , mobilenumber , address} = data;
        console.log("Form Data Submitted:", data); 
        mutate({name , mobilenumber , address});
    };

  return (
    <MainLayout>
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800 ml-4">Profile Settings</h1>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Profile Picture */}
            <div className="md:col-span-1 flex flex-col items-center">
              <div className="relative group">
                <ProfilePic
                  avatar={profileData?.avatar}
                  className="w-48 h-48 rounded-full border-4 border-white shadow-lg"
                />
             
              </div>
              <div className="mt-4 text-center">
  <p className="text-lg font-semibold text-gray-700">{profileData?.email}</p>
  {profileData?.createdAt && (
    <p className="text-gray-500">
      Member since {registrationYear}
    </p>
  )}
</div>
            </div>

            {/* Right Column - Form */}
            <div className="md:col-span-2">
              {!isProfileLoading && !isProfileError && (
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                            {...register('name',
                            {
                                required: {
                                    value: true,
                                    message: "Name is required",
                            },
                            minLength: {
                                value: 3,
                                message: "Name length must be at least 3 character",
                            },
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Name must contain only letters and spaces",
                            },
                            
                        })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Mobile Number Field */}
                    <div>
                      <label
                        htmlFor="mobilenumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="mobilenumber"
                        {...register('mobilenumber', {
                            required: "Mobile number is required",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Mobile number must be 10 digits",
                            },
                          })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.mobilenumber ? 'border-red-500' : 'border-gray-200'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {errors.mobilenumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.mobilenumber.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      id="address"
                      {...register('address', {
                        required: "Address is required",
                        minLength: { value: 6, message: "Address must be at least 6 characters" },
                      })}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Delete Account
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid || isLoading}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;