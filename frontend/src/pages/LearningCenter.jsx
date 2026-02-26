import React, { useState } from 'react';
import {
    CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw,
    BookOpen, TrendingUp, Brain, PlayCircle, ArrowLeft
} from 'lucide-react';
import { QUIZ_DATA, COURSES_DATA } from '../data/mockData';

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
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Finance Academy</h1>
                <p style={{ color: 'var(--text-muted)' }}>Master the markets with our structured learning paths.</p>
            </header>

            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {COURSES_DATA.map(course => (
                    <div key={course.id} className="glass-card course-card" style={{ padding: '2rem' }}>
                        <div className="icon-box" style={{ marginBottom: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--secondary)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {course.icon === 'BookOpen' && <BookOpen size={24} />}
                            {course.icon === 'TrendingUp' && <TrendingUp size={24} />}
                            {course.icon === 'Brain' && <Brain size={24} />}
                        </div>
                        <h3>{course.title}</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem', fontSize: '0.95rem' }}>{course.description}</p>
                        <button className="btn-primary" style={{ width: '100%' }} onClick={() => viewCourseDetails(course)}>
                            Start Learning
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const CourseDetails = () => (
        <div className="course-details">
            <button className="nav-item" onClick={goBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <ArrowLeft size={20} /> Back to Academy
            </button>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>{selectedCourse.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>{selectedCourse.description}</p>

                <div className="modules-list" style={{ display: 'grid', gap: '1.5rem' }}>
                    {selectedCourse.modules.map((module, idx) => (
                        <div key={module.id} className="module-item" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                    {idx + 1}
                                </div>
                                <h4 style={{ margin: 0 }}>{module.title}</h4>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{module.content}</p>
                        </div>
                    ))}
                </div>

                {selectedCourse.quizIds.length > 0 && (
                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <button className="btn-primary" onClick={() => startQuiz(selectedCourse)} style={{ padding: '1rem 2.5rem' }}>
                            Take the Assessment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const QuizMode = () => {
        const currentQuizData = QUIZ_DATA.filter(q => selectedCourse.quizIds.includes(q.id));

        if (quizComplete) {
            return (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <CheckCircle2 size={60} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h2>Assessment Complete!</h2>
                    <p style={{ margin: '1rem 0', fontSize: '1.2rem' }}>You scored {score} out of {currentQuizData.length}</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <button className="btn-outline" onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <RotateCcw size={20} /> Retake Quiz
                        </button>
                        <button className="btn-primary" onClick={goBack}>
                            Return to Course
                        </button>
                    </div>
                </div>
            );
        }

        const question = currentQuizData[currentQuestion];

        return (
            <div className="quiz-container">
                <button className="nav-item" onClick={goBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <ArrowLeft size={20} /> Exit Quiz
                </button>
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <span className="badge-ai">{selectedCourse.title}</span>
                        <h3 style={{ fontSize: '1.4rem', marginTop: '1rem', display: 'flex', gap: '12px' }}>
                            <HelpCircle color="var(--secondary)" /> {question.question}
                        </h3>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {question.options.map((option, index) => {
                            let statusClass = '';
                            if (isSubmitted) {
                                if (index === question.answer) statusClass = 'correct';
                                else if (index === selectedOption) statusClass = 'incorrect';
                            } else if (selectedOption === index) {
                                statusClass = 'selected';
                            }

                            return (
                                <div
                                    key={index}
                                    className={`quiz-option ${statusClass}`}
                                    onClick={() => handleOptionSelect(index)}
                                    style={{
                                        padding: '1.2rem',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--card-border)',
                                        cursor: isSubmitted ? 'default' : 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderColor: statusClass === 'selected' ? 'var(--secondary)' :
                                            statusClass === 'correct' ? 'var(--accent-green)' :
                                                statusClass === 'incorrect' ? 'var(--accent-red)' : 'var(--card-border)'
                                    }}
                                >
                                    {option}
                                    {statusClass === 'correct' && <CheckCircle2 size={18} color="var(--accent-green)" />}
                                    {statusClass === 'incorrect' && <XCircle size={18} color="var(--accent-red)" />}
                                </div>
                            );
                        })}
                    </div>

                    {isSubmitted && (
                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                            <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>AI Insight</h4>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{question.explanation}</p>
                        </div>
                    )}

                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Question {currentQuestion + 1} of {currentQuizData.length}</p>
                        {!isSubmitted ? (
                            <button className="btn-primary" onClick={handleSubmitQuiz} disabled={selectedOption === null}>
                                Check Answer
                            </button>
                        ) : (
                            <button className="btn-primary" onClick={handleNextQuestion} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {currentQuestion + 1 === currentQuizData.length ? 'See Results' : 'Next Question'} <ArrowRight size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {view === 'courses' && <CourseList />}
            {view === 'details' && <CourseDetails />}
            {view === 'quiz' && <QuizMode />}
        </div>
    );
};

export default LearningCenter;
