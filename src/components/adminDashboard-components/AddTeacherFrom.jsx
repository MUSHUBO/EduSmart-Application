'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AddTeacherForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [photoPreview, setPhotoPreview] = useState('/avatar-placeholder.png');
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 1. Cloudinary Image Upload Function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!res.ok) throw new Error('Image upload failed');

    const data = await res.json();
    return data.secure_url; 
  };

  // 🔹 2. Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let uploadedImageUrl = '/avatar-placeholder.png';

      // 🔸 Step 1: Upload image first (if selected)
      if (photoFile) {
        uploadedImageUrl = await uploadImageToCloudinary(photoFile);
      }

      // 🔸 Step 2: Combine all data + hosted image link
      const teacherData = {
        ...data,
        teacherPhoto: uploadedImageUrl,
      };

      // 🔸 Step 3: Post data to backend API
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success('Teacher added successfully!');
      } else {
        toast.error(result.message || 'Failed to add teacher');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while saving teacher!');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 3. Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 4. Remove image
  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('/avatar-placeholder.png');
    setValue('teacherPhoto', null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-5xl mx-auto">
      {/* 🔹 Teacher Info */}
      <div className="bg-white shadow-2xl my-5 p-4 rounded-xl">
        <h2 className="text-2xl font-semibold my-4">Teacher Information</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center space-y-2">
            <label className="label text-lg">Photo*</label>
            <div className="w-24 h-24 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={photoPreview} alt="Teacher" className="w-full h-full object-cover" />
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

          {/* Info Fields */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label className="label">First Name*</label>
              <input {...register('firstName', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Last Name*</label>
              <input {...register('lastName', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Email*</label>
              <input {...register('email', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Phone*</label>
              <input {...register('phone', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Address*</label>
              <input {...register('address', { required: true })} className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Joining Date*</label>
              <input type="date" {...register('joiningDate', { required: true })} className="input input-bordered w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Education & Experience */}
      <div className="bg-white shadow-2xl my-5 p-4 rounded-xl">
        <h2 className="text-2xl font-semibold my-4">Education & Experience</h2>
        <hr className="w-full my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Highest Qualification*</label>
            <input {...register('qualification', { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Institution*</label>
            <input {...register('institution', { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Experience (Years)*</label>
            <input type="number" {...register('experience', { required: true })} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="label">Specialty*</label>
            <input {...register('specialty', { required: true })} className="input input-bordered w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="label">Notes</label>
            <textarea {...register('notes')} className="textarea textarea-bordered w-full" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
