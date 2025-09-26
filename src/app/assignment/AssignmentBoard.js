"use client";

import { useEffect, useState } from "react";
import AttachmentPreview from "../components/AttachmentPreview/AttachmentPreview";
import { Clock, Download } from 'lucide-react';
import Link from "next/link";

export default function AssignmentBoard() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssignments() {
            const res = await fetch("/api/assignments", { method: "GET" });
            const data = await res.json();
            setAssignments(data.assignments || []);
            setLoading(false);
        }
        fetchAssignments();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading assignments...</div>;
    }

    if (!assignments.length) {
        return  <div className="text-center py-10 text-secondary">No assignments found.
        
       <div className="flex justify-center items-center py-4">
             <Link href="/assignment/new">
                <button className="bg-secondary text-white py-3 px-6 rounded-full hover:bg-primary cursor-pointer transition-colors duration-300">
                    Add New Assignments
                </button>
            </Link>
        </div>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <h2 className="font-serif cursor-pointer text-3xl font-semibold text-primary  text-center">Assignment Board</h2>
            <div className="flex justify-center items-center py-4">
             <Link href="/assignment/new">
                <button className="bg-secondary text-white py-3 px-6 rounded-full hover:bg-primary transition-colors duration-300">
                    Add New Assignments
                </button>
            </Link>
        </div>
            <div className="flex flex-col gap-10">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="relative group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent rounded-xl transition-all group-hover:opacity-50"></div>
                        <div className="relative border-2 border-primary/50 rounded-xl p-6 bg-white flex flex-col min-h-[300px] shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                            {assignment.attachmentUrl && (
                                <div className="absolute top-4 right-4">
                                    <AttachmentPreview url={assignment.attachmentUrl} className="w-20 h-20 border-4 border-primary/40 rounded-full" />
                                </div>
                            )}
                            <div className="flex items-baseline gap-3 mb-6 pr-20">
                                <p className="text-sm font-semibold text-primary flex-shrink-0">Assignment Title: <span className="text-foreground">{assignment.title}</span></p>
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-semibold text-primary mb-2">Description:</p>
                                <div className="border-2 border-accent/30 bg-background rounded-xl p-4 h-full shadow-sm hover:shadow-md transition-all">
                                    <p className="text-base text-foreground">{assignment.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center gap-3 bg-secondary text-white text-xs font-semibold px-5 py-2 rounded-full">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                                {assignment.attachmentUrl && (
                                    <a
                                        href={assignment.attachmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-secondary text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg hover:bg-primary transition-all duration-300 transform group-hover:scale-105"
                                    >
                                        <Download className="w-5 h-5" />
                                        <span>Download</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
