"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function CreateAssignmentForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setAttachmentUrl('');

        if (!title || !description || !dueDate) {
            setMessage('Please fill in all fields.');
            return;
        }

        let uploadedFileUrl = '';
        if (file) {
            const fileFormData = new FormData();
            fileFormData.append('file', file);
            fileFormData.append('filename', file.name);
            fileFormData.append('filetype', file.type);
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
                    return;
                }
            } catch (error) {
                setMessage('File upload failed.');
                return;
            }
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dueDate', dueDate);
        formData.append('teacherId', '60d5f9b1f1b3b3b3b3b3b3b3'); 
        if (uploadedFileUrl) {
            formData.append('attachmentUrl', uploadedFileUrl);
        }

        try {
            const res = await fetch('/api/assignments', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Assignment Created!',
                    text: 'Your New assignment has been successfully created.',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    router.push('/');
                });
                setMessage('');
                setTitle('');
                setDescription('');
                setDueDate('');
                setFile(null);
                e.target.reset();
            } else {
                const data = await res.json();
                setMessage(`Error: ${data.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white border-2 border-primary rounded-3xl shadow-lg">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Create New Assignment</h2>
            <form onSubmit={handleSubmit}>
            
                <div className="mb-4">
                    <label htmlFor="title" className="block text-secondary font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:border-accent"
                    />
                </div>
               
                <div className="mb-4">
                    <label htmlFor="description" className="block text-secondary font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:border-accent"
                    ></textarea>
                </div>
               
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-secondary font-bold mb-2">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:border-accent"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="attachment" className="block text-secondary font-bold mb-2">Attachment (Optional)</label>
                    <input
                        type="file"
                        id="attachment"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full text-sm text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-background file:text-primary hover:file:bg-accent hover:file:text-white"
                    />
                </div>
                <button type="submit" className="w-full bg-primary hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                    Assign Now
                </button>
                {message && <p className="mt-4 text-center">{message}</p>}
            </form>
        </div>
    );
}