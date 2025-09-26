"use client";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { IoMdPhotos } from "react-icons/io";
import profile from "../../../../../public/lotttie-file/profile.json"
import Lottie from 'lottie-react';
import Link from 'next/link';
import { useAuth } from '@/Hoks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import GitHubButton from '../../components/GitHubButton/GitHubButton';

const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
  <polyline points="22,6 12,13 2,6"></polyline>
</svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
  <circle cx="12" cy="12" r="3"></circle>
</svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
  <line x1="1" y1="1" x2="23" y2="23"></line>
</svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
  <circle cx="12" cy="7" r="4"></circle>
</svg>;

const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const { createAccount, profileUpdateNamePhoto } = useAuth()
  const router = useRouter()

  const fileHandler = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setMessage('');
    setAttachmentUrl('');
    let uploadedFileUrl = '';

    const fileFormData = new FormData();
    fileFormData.append('file', selectedFile);
    fileFormData.append('filename', selectedFile.name);
    fileFormData.append('filetype', selectedFile.type);
    fileFormData.append('filePurpose', 'assignment');

    try {
      const fileRes = await fetch('/api/fileupload', {
        method: 'POST',
        body: fileFormData,
      });

      const fileData = await fileRes.json();

      if (fileRes.ok && fileData.url) {
        uploadedFileUrl = fileData.url;
        setAttachmentUrl(uploadedFileUrl);
      } else {
        setMessage(`File upload error: ${fileData.error || 'Unknown error.'}`);
      }
    } catch (error) {
      setMessage('File upload failed.');
    }
  };


  const onSubmit = (data) => {
    if (!attachmentUrl) {
      toast.error("Please upload a profile photo first");
      return;
    }
    const { email, password } = data
    createAccount(email, password)
      .then(async (result) => {
        console.log(result.user);

        const getname = data.fullName
        const updateProfile = {
          displayName: getname,
          photoURL: attachmentUrl
        }

        profileUpdateNamePhoto(updateProfile)
          .then(() => {
            toast.success(' Profile create Successfully', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce
            });
            router.push("/")
            reset();
            console.log(updateProfile);
          })
          .catch((error) => {
            console.log(error);
          })


      })
      .catch((error) => {
        toast.error(`${error.code}`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce
        });
      })
  };


  return <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
      { }
      <div className="signin-card bg-muted dark:bg-muted border-2 border-primary/45 dark:border-primary/45 rounded-lg shadow-sm p-6">
        { }
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full mb-4">

            <Lottie animationData={profile} loop={true} />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Create account
          </h1>
        </div>


        { }
        <div className="grid grid-cols-2 gap-4">
          <GoogleButton></GoogleButton>
          <GitHubButton></GitHubButton>

        </div>

        { }

        { }
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        { }

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          { }
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Full Name
            </label>
            <div className='relative'>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <UserIcon />
              </div>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                placeholder="Enter your full name"
                className="signin-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
              />
            </div>

            {errors.fullName && (
              <p className="text-red-500 text-xs">
                {String(errors.fullName.message)}
              </p>
            )}
          </div>

          { }
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Photo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <IoMdPhotos />
              </div>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                onChange={fileHandler}
                className="signin-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-xs">
                {String(errors.photo.message)}
              </p>
            )}
          </div>

          { }


          { }
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>
            <div className='relative'>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <MailIcon />
              </div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@example.com"
                className="signin-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-xs">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          { }
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include uppercase, lowercase, number & special character",
                  },
                })}
                placeholder="Create a password"
                className="signin-input w-full pl-3 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3  flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">
                {String(errors.password.message)}
              </p>
            )}
          </div>
          { }
          <div className="flex items-start space-x-2">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept terms" })}
              className=" w-4 h-4 bg-primary"
            />
            <label
              htmlFor="terms"
              className="text-sm text-popover dark:text-popover cursor-pointer leading-4"
            >
              I agree to the{" "}
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs">
              {String(errors.terms.message)}
            </p>
          )}

          { }
          <button
            type="submit"
            className="signin-button cursor-pointer w-full bg-primary dark:bg-primary text-white dark:text-gray-900 py-2 px-4 rounded-md text-sm font-medium"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>;
};
export default RegisterForm;
const styles = `
  .signin-input:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  .dark .signin-input:focus {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }

  .signin-button:hover {
    transform: translateY(-1px);
  }

  .signin-checkbox:checked + label .checkbox-icon {
    background-color: currentColor;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .signin-card {
    animation: fadeIn 0.3s ease-out;
  }
`;
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
