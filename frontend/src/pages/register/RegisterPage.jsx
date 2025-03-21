import React, { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { Link , useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import  { signup  } from '../../../services/userService';
import { toast } from 'react-hot-toast';
import { useDispatch , useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducer'; 

const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => signup({ name, email, password }),
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
            
            
            console.log("User registered successfully:", data);
            // Redirect or show success message
        },
        onError: (error) => {
            toast.error(error.message); 
            console.error("Error registering user:", error);
        }
    });

    useEffect(() => {
        if (userState.userInfo) {
            
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


    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange", // Trigger validation onChange
    });

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({
            name,
            email,
            password,

        });
    };

    useEffect(() => {
        // Clear error when the user starts typing
        const subscription = watch((value, { name }) => {
            if (errors[name]) {
                setValue(name, value[name], { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, errors, setValue]);

    return (
        <MainLayout>
            <section className='container mx-auto px-5 py-10'>
                <div className='w-full max-w-sm mx-auto'>
                    <h1 className='font-sans text-2xl font-bold text-center text-dark-hard mb-8'>Register</h1>
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
                            <label htmlFor='password' className='text-[#5a7184] font-semibold block'>Password</label>
                            <input 
                                type='password' 
                                id='password' 
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    }
                                })}
                                placeholder='Enter your password' 
                                className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]' 
                            />
                            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className='flex flex-col mb-6 w-full'>
                            <label htmlFor='confirmPassword' className='text-[#5a7184] font-semibold block'>Confirm Password</label>
                            <input 
                                type='password' 
                                id='confirmPassword' 
                                {...register("confirmPassword", {
                                    required: {
                                        value: true,
                                        message: "Confirm Password is required",
                                    },
                                    validate: (value) => value === watch('password') || "Passwords do not match"
                                })}
                                placeholder='Confirm your password' 
                                className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]' 
                            />
                            {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                        </div>

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
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        {/* Login Link */}
                        <p className='text-sm font-semibold text-[#5a7184]'>
                            You have an account? 
                            <Link to='/login' className='text-blue-700 font-semibold'>Login now</Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default RegisterPage;
