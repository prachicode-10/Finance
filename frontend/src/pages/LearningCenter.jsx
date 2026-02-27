import React, { useState } from 'react';
import {
    CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw,
    BookOpen, TrendingUp, Brain, ArrowLeft, Zap, Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { QUIZ_DATA, COURSES_DATA } from '../data/mockData';
import AIFlowchart from '../components/AIFlowchart';

const LearningCenter = () => {
    const [view, setView] = useState('courses'); // 'courses', 'details', 'quiz'
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    // Quiz Logic
    const handleOptionSelect = (index) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmitQuiz = () => {
        if (selectedOption === null) return;
        const currentQuizData = QUIZ_DATA.filter(q => selectedCourse.quizIds.includes(q.id));
        if (selectedOption === currentQuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
        setIsSubmitted(true);
    };

    const handleNextQuestion = () => {
        const currentQuizData = QUIZ_DATA.filter(q => selectedCourse.quizIds.includes(q.id));
        if (currentQuestion + 1 < currentQuizData.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setScore(0);
        setQuizComplete(false);
    };

    const startQuiz = (course) => {
        setSelectedCourse(course);
        resetQuiz();
        setView('quiz');
    };

    const viewCourseDetails = (course) => {
        setSelectedCourse(course);
        setView('details');
    };

    const goBack = () => {
        if (view === 'quiz') setView('details');
        else if (view === 'details') setView('courses');
    };

    // Sub-components
    const CourseList = () => (
        <div className="learning-center">
            <header style={{ marginBottom: '3rem' }}>
                <div className="flex items-center gap-3 mb-2">
                    <Zap className="text-primary" size={24} />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Neural Academy</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Financial Mastery</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>AI-powered structured learning paths for the modern market.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES_DATA.map(course => (
                    <div key={course.id} className="glass-card flex flex-col p-8 group hover:border-primary/30 transition-all duration-500">
                        <div className="w-14 h-14 bg-indigo-500/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-500">
                            {course.icon === 'BookOpen' && <BookOpen size={28} />}
                            {course.icon === 'TrendingUp' && <TrendingUp size={28} />}
                            {course.icon === 'Brain' && <Brain size={28} />}
                        </div>
                        <h3 className="text-xl mb-3">{course.title}</h3>
                        <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">{course.description}</p>
                        <button className="btn-primary w-full py-4 tracking-widest text-xs font-black uppercase" onClick={() => viewCourseDetails(course)}>
                            Access Module
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const CourseDetails = () => (
        <div className="course-details">
            <button className="flex items-center gap-2 mb-8 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter" onClick={goBack}>
                <ArrowLeft size={18} /> Exit Module
            </button>

            <div className="glass-card p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h2 className="text-3xl mb-2">{selectedCourse.title}</h2>
                        <p className="text-white/40 max-w-2xl leading-relaxed">{selectedCourse.description}</p>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-3 bg-primary/10 border border-primary/20 rounded-2xl">
                        <Activity size={16} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live AI Optimization active</span>
                    </div>
                </div>

                <div className="space-y-16">
                    {selectedCourse.modules.map((module, idx) => (
                        <div key={module.id} className="relative">
                            <div className="flex items-start gap-8">
                                <div className="hidden md:flex min-w-[48px] h-[48px] rounded-2xl bg-white/5 border border-white/10 text-white/20 items-center justify-center text-lg font-black italic">
                                    0{idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-2xl mb-4 text-white hover:text-primary transition-colors cursor-default">{module.title}</h4>
                                    <p className="text-md text-white/60 leading-loose mb-10 max-w-4xl">{module.content}</p>

                                    <div className="mt-8">
                                        <AIFlowchart data={module.diagramData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCourse.quizIds.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-white/5 text-center">
                        <button className="btn-primary px-12 py-5 text-sm" onClick={() => startQuiz(selectedCourse)}>
                            VERIFY KNOWLEDGE BASE
                        </button>
                        <p className="mt-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Requires 70% proficiency to pass</p>
                    </div>
                )}
            </div>
        </div>
    );

    const QuizMode = () => {
        const currentQuizData = QUIZ_DATA.filter(q => selectedCourse.quizIds.includes(q.id));

        if (quizComplete) {
            return (
                <div className="glass-card text-center p-12">
                    <CheckCircle2 size={64} className="text-primary mx-auto mb-6" />
                    <h2 className="text-3xl mb-8">Assessment Analyzed</h2>

                    <div className="h-[300px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Correct', value: score },
                                        { name: 'Incorrect', value: currentQuizData.length - score }
                                    ]}
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="var(--primary)" />
                                    <Cell fill="var(--accent-red)" opacity={0.3} />
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <p className="text-2xl font-bold text-white mb-2">
                        Neural Score: {Math.round((score / currentQuizData.length) * 100)}%
                    </p>
                    <p className="text-white/40 mb-10">
                        {score === currentQuizData.length ? "Perfect calibration. Your market understanding is elite." :
                            score > currentQuizData.length / 2 ? "Solid comprehension. Further data cycles recommended." :
                                "Insufficient proficiency. Re-evaluate core modules."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-2" onClick={resetQuiz}>
                            <RotateCcw size={16} /> Re-Calculate
                        </button>
                        <button className="btn-primary px-10 py-4 text-xs" onClick={goBack}>
                            RETURN TO SYLLABUS
                        </button>
                    </div>
                </div>
            );
        }

        const question = currentQuizData[currentQuestion];

        return (
            <div className="quiz-container">
                <button className="flex items-center gap-2 mb-8 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-tighter" onClick={goBack}>
                    <ArrowLeft size={18} /> ABORT ASSESSMENT
                </button>
                <div className="glass-card p-10">
                    <div className="mb-10">
                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest rounded-md border border-secondary/20">
                            {selectedCourse.title}
                        </span>
                        <h3 className="text-2xl mt-6 flex items-start gap-4">
                            <HelpCircle className="text-secondary mt-1 shrink-0" size={24} />
                            <span className="leading-snug">{question.question}</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((option, index) => {
                            let statusClass = 'border-white/10 bg-white/3 hover:bg-white/5 hover:border-white/20';
                            if (isSubmitted) {
                                if (index === question.answer) statusClass = 'border-primary bg-primary/10 text-primary';
                                else if (index === selectedOption) statusClass = 'border-accent-red bg-accent-red/10 text-accent-red';
                                else statusClass = 'border-white/5 bg-white/2 opacity-30';
                            } else if (selectedOption === index) {
                                statusClass = 'border-secondary bg-secondary/10 text-secondary ring-1 ring-secondary/50';
                            }

                            return (
                                <div
                                    key={index}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex justify-between items-center group ${statusClass}`}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    <span className="font-medium">{option}</span>
                                    {isSubmitted && index === question.answer && <CheckCircle2 size={18} />}
                                    {isSubmitted && index === selectedOption && index !== question.answer && <XCircle size={18} />}
                                </div>
                            );
                        })}
                    </div>

                    {isSubmitted && (
                        <div className="mt-8 p-6 bg-indigo-500/5 rounded-2xl border-l-4 border-indigo-500 flex gap-4">
                            <Brain className="text-indigo-400 shrink-0" size={24} />
                            <div>
                                <h4 className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">Expert Insight</h4>
                                <p className="text-sm text-white/70 leading-relaxed">{question.explanation}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-1">
                                {currentQuizData.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentQuestion ? 'w-8 bg-primary' : i < currentQuestion ? 'w-3 bg-primary/40' : 'w-3 bg-white/10'}`} />
                                ))}
                            </div>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-2 text-center sm:text-left">
                                Processing Step {currentQuestion + 1} of {currentQuizData.length}
                            </p>
                        </div>

                        {!isSubmitted ? (
                            <button className="btn-primary px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmitQuiz} disabled={selectedOption === null}>
                                ANALYZE ANSWER
                            </button>
                        ) : (
                            <button className="btn-primary px-10 py-4 flex items-center gap-2" onClick={handleNextQuestion}>
                                {currentQuestion + 1 === currentQuizData.length ? 'FINALIZE ASSESSMENT' : 'NEXT COMPUTATION'} <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {view === 'courses' && <CourseList />}
            {view === 'details' && <CourseDetails />}
            {view === 'quiz' && <QuizMode />}
        </div>
    );
};

export default LearningCenter;
