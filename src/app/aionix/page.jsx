"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles, Download, Lightbulb, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { classes, subjects, hoursPerWeek, learningStyles, schoolPaths } from "@/data/schoolLearningData";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SchoolAIPage() {
    const [formData, setFormData] = useState({
        grade: "",
        subject: "",
        hours: "",
        style: "",
    });
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [motivation, setMotivation] = useState("");
    const [tip, setTip] = useState("");

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGenerate = () => {
        const { grade, subject, hours, style } = formData;
        if (!grade || !subject || !hours || !style) return;

        setLoading(true);
        setPath(null);
        setQuiz(null);
        setMotivation("");
        setTip("");

        setTimeout(() => {
            const steps = schoolPaths[grade]?.[subject]?.[style] || ["No data available"];
            setPath({
                title: `${grade} - ${subject} Roadmap`,
                duration: `${hours} hours/week - ${style} learning`,
                steps: steps.map((step, index) => ({
                    name: `Step ${index + 1}`,
                    details: step,
                })),
            });

            // Simple quiz generator
            setQuiz([
                { q: "What is your biggest struggle in this topic?", type: "text" },
                { q: "How confident are you in this subject (1-10)?", type: "number" },
                { q: "Which topic do you enjoy most?", type: "text" },
            ]);

            // Random motivation
            const motivations = [
                "Every expert was once a beginner — keep pushing!",
                "Consistency beats talent when talent doesn’t work hard.",
                "Learning is your superpower — use it daily!",
                "Don’t study for grades, study for growth.",
            ];
            setMotivation(motivations[Math.floor(Math.random() * motivations.length)]);

            // Smart study tip
            const tips = [
                "Take 10-minute breaks after every 40 minutes of study.",
                "Use visuals or notes based on your learning style.",
                "Revise your notes before sleeping for better memory.",
                "Teach someone what you’ve learned — that’s mastery!",
            ];
            setTip(tips[Math.floor(Math.random() * tips.length)]);

            setLoading(false);
        }, 1500);
    };

    const handleExportPDF = async () => {
        const element = document.getElementById("roadmap-section");
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`${formData.grade}_${formData.subject}_Roadmap.pdf`);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white px-6 md:px-9 lg:px-12 py-16">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-popover text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-2">
                    <Brain size={35} className="text-primary mt-1" /> AI School Learning
                    Path Generator
                </h1>
                <p className="text-popover-foreground mt-2">
                    Choose your preferences and get a personalized study plan.
                </p>
            </motion.div>

            <Card className="w-full max-w-2xl bg-primary/75 border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>Enter Your Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <select
                            name="grade"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-primary text-popover border border-gray-700 focus:border-primary outline-none"
                        >
                            <option value="">Select Class</option>
                            {classes.map((g, i) => (
                                <option key={i}>{g}</option>
                            ))}
                        </select>

                        <select
                            name="subject"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-primary text-popover border border-gray-700 focus:border-primary outline-none"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((s, i) => (
                                <option key={i}>{s}</option>
                            ))}
                        </select>

                        <select
                            name="hours"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-primary text-popover border border-gray-700 focus:border-primary outline-none"
                        >
                            <option value="">Hours per week</option>
                            {hoursPerWeek.map((h, i) => (
                                <option key={i}>{h}</option>
                            ))}
                        </select>

                        <select
                            name="style"
                            onChange={handleChange}
                            className="p-3 rounded-lg bg-primary text-popover border border-gray-700 focus:border-primary outline-none"
                        >
                            <option value="">Learning Style</option>
                            {learningStyles.map((l, i) => (
                                <option key={i}>{l}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="bg-primary border-2 border-white hover:bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-all"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin mr-2" />
                            ) : (
                                <Sparkles className="mr-2" />
                            )}
                            Generate My Path
                        </button>
                    </div>
                </CardContent>
            </Card>

            {loading && (
                <motion.div
                    className="mt-10 text-cyan-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Generating roadmap...
                </motion.div>
            )}

            {path && (
                <motion.div
                    id="roadmap-section"
                    className="mt-10 w-full max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="bg-primary/75 text-popover border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl">{path.title}</CardTitle>
                            <p className="text-popover-foreground">{path.duration}</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {path.steps.map((step, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-primary text-popover border border-gray-700 p-4 rounded-xl hover:border-cyan-500 transition-all"
                                    >
                                        <h3 className="text-lg font-semibold text-popover">
                                            {step.name}
                                        </h3>
                                        <p className="text-popover text-sm mt-1">
                                            {step.details}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={handleExportPDF}
                                    className="flex items-center gap-2 bg-secondary/95 cursor-pointer hover:bg-secondary text-white px-4 py-2 rounded-lg"
                                >
                                    <Download size={18} /> Export PDF
                                </button>
                                <div className="flex items-center gap-2 text-popover p-1 rounded-2xl bg-secondary">
                                    <Lightbulb size={18} />
                                    <span className="text-sm">{tip}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Motivation Section */}
                    <motion.div
                        className="bg-primary/70 text-center mt-8 p-4 rounded-xl border border-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <MessageSquare className="mx-auto text-cyan-400 mb-2" />
                        <p className="text-lg italic">{motivation}</p>
                    </motion.div>

                    {/* Simple Quiz Section */}
                    <motion.div
                        className="mt-10 bg-primary/70 border border-gray-700 p-5 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h2 className="text-xl text-popover font-semibold mb-3">
                            Quick Reflection Quiz
                        </h2>

                        {quiz?.map((q, i) => (
                            <div key={i} className="mb-3">
                                <label className="block text-popover-foreground mb-1">{q.q}</label>
                                <input
                                    type={q.type}
                                    className="quiz-input w-full p-2 rounded-lg bg-primary border border-gray-600 outline-none text-popover"
                                    placeholder="Your answer..."
                                />
                            </div>
                        ))}

                        {/* ✅ Submit button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => {
                                    const inputs = document.querySelectorAll(".quiz-input");
                                    const allFilled = Array.from(inputs).every(
                                        (input) => input.value.trim() !== ""
                                    );

                                    if (!allFilled) {
                                        toast.error("⚠️ Please fill in all quiz fields!", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            theme: "dark",
                                        });
                                        return;
                                    }

                                    toast.success("✅ Quiz submitted successfully!", {
                                        position: "top-center",
                                        autoClose: 2000,
                                        theme: "dark",
                                    });

                                    // Optional: Clear inputs after submit
                                    inputs.forEach((input) => (input.value = ""));
                                }}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-all"
                            >
                                Submit Quiz
                            </button>
                        </div>

                        {/* ✅ Toastify container */}
                        <ToastContainer />
                    </motion.div>

                </motion.div>
            )}
        </div>
    );
}

