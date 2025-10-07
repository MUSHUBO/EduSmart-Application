'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AddStudentForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [photoPreview, setPhotoPreview] = useState('/avatar-placeholder.png');
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Upload to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // ✅ Hosted image link
  };

  // 🔹 Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let uploadedImageUrl = null;

      // If a photo is selected, upload it first
      if (photoFile) {
        uploadedImageUrl = await uploadImageToCloudinary(photoFile);
      }

      const formData = {
        ...data,
        studentPhoto: uploadedImageUrl || '/avatar-placeholder.png',
      };

      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success('Student added successfully!');
      } else {
        toast.error(result.message || 'Failed to add student');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('/avatar-placeholder.png');
    setValue('studentPhoto', null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-5xl mx-auto">
      {/* Student Info */}
      <div className="bg-white shadow-2xl my-5 p-4 rounded-xl">
        <h2 className="text-2xl font-semibold my-4 mx-auto">Student Details</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center space-y-2 my-auto">
            <label className="label text-xl">Photo*</label>
            <div className="w-24 h-24 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={photoPreview} alt="Student" className="w-full h-full object-cover" />
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
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
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
            <div>
              <label className="label">Email*</label>
              <input
                {...register('studentEmail', { required: true })}
                className="input input-bordered w-full"
                placeholder="Student Email"
              />
            </div>
            <div>
              <label className="label">Phone Number*</label>
              <input
                {...register('studentPhone', { required: true })}
                className="input input-bordered w-full"
                placeholder="+123456789"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Parents Info */}
      <div className="bg-white shadow-2xl my-5 p-4 rounded-xl">
        <h2 className="text-2xl font-semibold my-4 mx-auto">Parent Details</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">First Name*</label>
            <input
              {...register('parentFirstName', { required: true })}
              className="input input-bordered w-full"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="label">Last Name*</label>
            <input
              {...register('parentLastName', { required: true })}
              className="input input-bordered w-full"
              placeholder="Last Name"
            />
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
            <label className="label">Phone*</label>
            <input
              {...register('parentPhone', { required: true })}
              className="input input-bordered w-full"
              placeholder="+123456789"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
