import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QUIZ_DATA } from '../data/mockData';

const LearningCenter = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const handleOptionSelect = (index) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;
        if (selectedOption === QUIZ_DATA[currentQuestion].answer) {
            setScore(score + 1);
        }
        setIsSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestion + 1 < QUIZ_DATA.length) {
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

    if (quizComplete) {
        return (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                <CheckCircle2 size={60} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2>Quiz Complete!</h2>
                <p style={{ margin: '1rem 0', fontSize: '1.2rem' }}>You scored {score} out of {QUIZ_DATA.length}</p>
                <button className="btn-primary" onClick={resetQuiz} style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                    <RotateCcw size={20} /> Try Again
                </button>
            </div>
        );
    }

    const question = QUIZ_DATA[currentQuestion];

    return (
        <div className="learning-center">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Financial Literacy Quiz</h1>
                <p style={{ color: 'var(--text-muted)' }}>Question {currentQuestion + 1} of {QUIZ_DATA.length}</p>
            </header>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', display: 'flex', gap: '12px' }}>
                    <HelpCircle color="var(--secondary)" /> {question.question}
                </h3>

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
                        <h4 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Explanation</h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{question.explanation}</p>
                    </div>
                )}

                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    {!isSubmitted ? (
                        <button className="btn-primary" onClick={handleSubmit} disabled={selectedOption === null}>
                            Check Answer
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={handleNext} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {currentQuestion + 1 === QUIZ_DATA.length ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearningCenter;
