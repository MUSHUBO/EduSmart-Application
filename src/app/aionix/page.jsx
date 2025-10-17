"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { classes, subjects, hoursPerWeek, learningStyles, schoolPaths } from "@/data/schoolLearningData";

export default function SchoolAIPage() {
    const [formData, setFormData] = useState({
        grade: "",
        subject: "",
        hours: "",
        style: "",
    });
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGenerate = () => {
        const { grade, subject, hours, style } = formData;
        if (!grade || !subject || !hours || !style) return;

        setLoading(true);
        setPath(null);

        setTimeout(() => {
            const steps = schoolPaths[grade]?.[subject]?.[style] || ["No data available"];
            setPath({
                title: `${grade} - ${subject} Roadmap`,
                duration: `${hours} hours/week - ${style} learning`,
                steps: steps.map((step, index) => ({ name: `Step ${index + 1}`, details: step })),
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full flex flex-col items-center 
         text-white px-6 md:px-9 lg:px-12 py-18 md:py-24 lg:py-28">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <h1 className="text-popover text-2xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-2">
                    <Brain size={35} className="text-primary mt-1" /> School AI Learning Path Generator
                </h1>
                <p className="text-popover-foreground mt-2">Select your options to generate a personalized roadmap for students.</p>
            </motion.div>

            <Card className="w-full max-w-2xl bg-gray-800/70 border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>Enter Your Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <select name="grade" onChange={handleChange} className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary outline-none">
                            <option value=""> Select Class</option>
                            {classes.map((g, i) => (<option key={i}>{g}</option>))}
                        </select>

                        <select name="subject" onChange={handleChange} className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary outline-none">
                            <option value=""> Select Subject</option>
                            {subjects.map((s, i) => (<option key={i}>{s}</option>))}
                        </select>

                        <select name="hours" onChange={handleChange} className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary outline-none">
                            <option value=""> Hours per week</option>
                            {hoursPerWeek.map((h, i) => (<option key={i}>{h}</option>))}
                        </select>

                        <select name="style" onChange={handleChange} className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-primary outline-none">
                            <option value=""> Learning Style</option>
                            {learningStyles.map((l, i) => (<option key={i}>{l}</option>))}
                        </select>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button onClick={handleGenerate} disabled={loading} className="bg-primary/95 hover:bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-all">
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                            Generate My Path
                        </button>
                    </div>
                </CardContent>
            </Card>

            {loading && <motion.div className="mt-10 text-cyan-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Generating roadmap...</motion.div>}

            {path && (
                <motion.div className="mt-10 w-full max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="bg-gray-800/80 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl text-cyan-400">{path.title}</CardTitle>
                            <p className="text-gray-400">{path.duration}</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {path.steps.map((step, index) => (
                                    <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                                        className="bg-gray-900/60 border border-gray-700 p-4 rounded-xl hover:border-cyan-500 transition-all">
                                        <h3 className="text-lg font-semibold text-white">{step.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{step.details}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
