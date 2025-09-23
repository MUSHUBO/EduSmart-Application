import { FileImage, FileText, FileSpreadsheet, Paperclip } from 'lucide-react';

function getIconForFile(url) {
    const extension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
       
        return <FileImage className="w-10 h-10 text-primary" />;
    }
    if (extension === 'pdf') {
        return <FileText className="w-10 h-10 text-red-600" />;
    }
    if (['xls', 'xlsx', 'csv'].includes(extension)) {
        return <FileSpreadsheet className="w-10 h-10 text-green-600" />;
    }
    
    return <Paperclip className="w-10 h-10 text-primary" />;
}

export default function AttachmentDisplayIcon({ url }) {
    return (
        <div className="flex flex-col items-center gap-1">
            {getIconForFile(url)}
           
            <p className="text-xs font-semibold text-secondary">Attachment</p>
        </div>
    );
}