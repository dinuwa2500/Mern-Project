import React, { useEffect } from 'react'; 
import MainLayout from '../../components/MainLayout'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form'; 
import { useMutation } from '@tanstack/react-query'; 
import { login} from '../../../services/userService'; 
import { toast } from 'react-hot-toast'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { userActions } from '../../store/reducers/userReducer';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);

    // Mutation for login request
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: (data) => {
            if (data?.error) {
                // Show API error if present
                toast.error(data.error);
            } else {
                dispatch(userActions.setUserInfo(data));
                localStorage.setItem("account", JSON.stringify(data));
                console.log("User logged in successfully:", data);
                navigate("/"); // Redirect to home or dashboard
            }
        },
        onError: (error) => {
            // Handle API errors (like 401 or 403)
            const errorMessage = error?.response?.data?.message || "Invalid email or password";
            toast.error(errorMessage);
            console.error("Login failed:", error);
        }
    });

    useEffect(() => {
        if (userState.userInfo) {
            toast.success("Login successful");
            navigate("/"); // Redirect after successful login
        }
    }, [userState.userInfo, navigate]);

    // React Hook Form for input handling and validation
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid }, 
        setValue, 
        watch 
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });
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
                    <h1 className='font-sans text-2xl font-bold text-center text-dark-hard mb-8'>
                        Login
                    </h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {/* Email Input */}
                        <div className='flex flex-col mb-6 w-full'>
                            <label htmlFor='email' className='text-[#5a7184] font-semibold block'>
                                Email
                            </label>
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
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                {...register("password", {
                                    required: "Password is required", // Only required validation
                                })}
                                placeholder='Enter your password'
                                className='placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]'
                            />
                            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
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
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {/* Register Link */}
                        <p className='text-sm font-semibold text-[#5a7184]'>
                            Don't have an account? 
                            <Link to='/register' className='text-blue-700 font-semibold'>Register now</Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default LoginPage;
