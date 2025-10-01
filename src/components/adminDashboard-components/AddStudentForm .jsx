'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AddStudentForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const [photoPreview, setPhotoPreview] = useState('/avatar-placeholder.png');
    const [photoFile, setPhotoFile] = useState(null);

    const onSubmit = (data) => {
        console.log('Form Data:', {
            ...data,
            studentPhoto: photoFile,
        });
        // TODO : ekhan theke amake ekhon backend api call kore Database e data post korte hobe


        toast.success('Form submitted successfully!');
    };

    // Watch the file input to generate preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview('/avatar-placeholder.png');
        setValue('studentPhoto', null);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10  max-w-5xl mx-auto"
        >
            {/* student info */}
            <div className=' bg-white shadow-2xl my-5 p-4 rounded-xl'>
                <h2 className="text-2xl sm:text-xl font-semibold my-4 mx-auto">Student Details</h2>
                <hr className='w-full my-2'/>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
                    {/* Photo Upload Section */}
                    <div className="flex flex-col items-center space-y-2 my-auto">
                        <label className="label text-xl">Photo*</label>
                        <div className="w-24 h-24 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                                src={photoPreview}
                                alt="Student"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full max-w-xs"
                            onChange={handleImageChange}
                        />
                        <button
                            type="button"
                            className="btn btn-error btn-sm w-full max-w-xs"
                            onClick={handleRemovePhoto}
                            disabled={!photoFile}
                        >
                            Remove
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">First Name*</label>
                            <input
                                {...register('studentFirstName', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="First Name"
                            />
                        </div>

                        <div>
                            <label className="label">Last Name*</label>
                            <input
                                {...register('studentLastName', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Last Name"
                            />
                        </div>

                        <div>
                            <label className="label">Date of Birth*</label>
                            <input
                                type="date"
                                {...register('dob', { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">Place of Birth*</label>
                            <input
                                {...register('placeOfBirth', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Country"
                            />
                        </div>
                        <div className="">
                            <label className="label">Email*</label>
                            <input
                                {...register('studentEmail', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Student Email"
                            />
                        </div>

                        <div className="">
                            <label className="label">Phone Number*</label>
                            <input
                                {...register('studentPhone', { required: true })}
                                className="input input-bordered w-full"
                                placeholder="+123456789"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Address*</label>
                            <textarea
                                {...register('studentAddress', { required: true })}
                                className="textarea textarea-bordered w-full"
                                placeholder="Address"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Parents Info Section (unchanged) */}

            <div className=' bg-white shadow-2xl my-5 p-4 rounded-xl'>
                <h2 className="text-2xl sm:text-xl font-semibold my-4 mx-auto">Parents Details</h2>
                   <hr className='w-full my-2'/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">First Name*</label>
                        <input
                            {...register('parentFirstName', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="First Name"
                        />
                        {errors.parentFirstName && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="label">Last Name*</label>
                        <input
                            {...register('parentLastName', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Last Name"
                        />
                        {errors.parentLastName && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div>
                        <label className="label">Email*</label>
                        <input
                            {...register('parentEmail', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label className="label">Phone Number*</label>
                        <input
                            {...register('parentPhone', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="+123456789"
                        />
                    </div>

                    <div className="">
                        <label className="label">Address*</label>
                        <textarea
                            {...register('parentAddress', { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Address"
                        />
                    </div>

                    <div className="">
                        <label className="label py-2">Payments*</label>
                        <div className="flex gap-4 items-center">
                            <label className="cursor-pointer label">
                                <input type="checkbox" {...register('paymentCash')} className="checkbox" />
                                <span className="label-text ml-2">Cash</span>
                            </label>
                            <label className="cursor-pointer label">
                                <input type="checkbox" {...register('paymentDebits')} className="checkbox" />
                                <span className="label-text ml-2">Debits</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
}

