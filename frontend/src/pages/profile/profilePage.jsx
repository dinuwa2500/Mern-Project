import React, { useEffect, useMemo } from 'react';
import MainLayout from '../../components/MainLayout';
import { Link , useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch , useSelector } from 'react-redux';
import { useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import { getUserProfile , updateProfile } from '../../../services/userService';
import ProfilePic from '../../components/ProfilePic';
import { userActions } from '../../store/reducers/userReducer';



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


    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => {
            return updateProfile({ token: userState.userInfo.token, userData: { name, email, password } });
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success("Profile updated successfully");

            console.log("User registered successfully:", data);
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
            email: "",
            password: "",
        },
        values: useMemo(() =>{
            return {
                name: isProfileLoading ? "" : profileData?.name,
                email: isProfileLoading ? "" : profileData?.email,
                password: isProfileLoading ? "" : profileData?.password,
            };
        }, [profileData?.name, profileData?.email, profileData?.password]),
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const {name , email , password} = data;
        mutate({name , email , password});
    };

    return (
        <MainLayout>
            <section className='container mx-auto px6 py-10 '>
                <div className='w-full max-w-sm mx-auto py-4'>

                    {/* Test updated Data*/ }
                    
                    {/*<p>{profileData?.name}</p>*/}

                    <h1 className='font-sans text-2xl font-bold text-center text-dark-hard mb-8'>Profile</h1>
                        <ProfilePic avatar={profileData?.avatar} />
                    {/* Loading Spinner */}
                    {isProfileLoading && (
                        <div className="flex justify-center items-center py-5">
                            <div className="w-16 h-16 border-8 border-t-8 border-blue-500 rounded-full animate-spin-smooth"></div>
                        </div>
                    )}
                    
                    {/* Error Handling */}
                    {isProfileError && (
                        <div className="text-red-500 text-center my-4">
                            <p>{error.message || "Something went wrong. Please try again."}</p>
                        </div>
                    )}

                    {/* Form */}
                    {!isProfileLoading && !isProfileError && (
                        <form onSubmit={handleSubmit(submitHandler)}>
                            {/* Name Input */}
                            <div className='flex flex-col mb-6 w-full'>
                                <label htmlFor='name' className='text-[#5a7184] font-semibold block'>Name</label>
                                <input 
                                    type='text' 
                                    id='name' 
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required",
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "Name length must be at least one character",
                                        },
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Name must contain only letters and spaces",
                                        }
                                    })}
                                    placeholder='Enter your name' 
                                    className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]' 
                                />
                                {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                            </div>

                            {/* Email Input */}
                            <div className='flex flex-col mb-6 w-full'>
                                <label htmlFor='email' className='text-[#5a7184] font-semibold block'>Email</label>
                                <input 
                                    type='text' 
                                    id='email'
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email format",
                                        }
                                    })}
                                    placeholder='Enter your email' 
                                    className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]' 
                                />
                                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                            </div>

                            {/* Password Input */}
                            <div className='flex flex-col mb-6 w-full'>
    <label htmlFor='password' className='text-[#5a7184] font-semibold block'>
        New Password (optional)
    </label>
    <input 
        type='password' 
        id='password' 
        {...register("password", {
            validate: (value) => {
                if (value && value.length < 6) {
                    return "Password must be at least 6 characters long";
                }
                return true;
            }
        })}
        placeholder='Enter your new password' 
        className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]' 
    />
    {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
</div>


                            {/* Confirm Password Input */}
                            

                            {/* Forgot Password Link */}
                            <Link to='/forget-psw' className='text-sm text-blue-700 font-semibold'>
                                Forgot password?
                            </Link>

                            {/* Submit Button */}
                            <button 
                                type='submit' 
                                className={`bg-blue-700 text-white font-bold text-lg rounded-lg px-8 py-4 w-full my-6 ${
                                    !isValid ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                }`}
                                disabled={!isValid}
                            >
                               Update Profile
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </MainLayout>
    );
};

export default ProfilePage;
