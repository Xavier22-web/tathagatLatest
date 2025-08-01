import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MockTestAttempt.css';

const MockTestAttempt = () => {
  const { testId, attemptId } = useParams();
  const navigate = useNavigate();
  
  // Test data and state
  const [testData, setTestData] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // UI state
  const [showCalculator, setShowCalculator] = useState(false);
  const [showScratchPad, setShowScratchPad] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');
  const [scratchPadContent, setScratchPadContent] = useState('');
  
  const timerRef = useRef(null);

  useEffect(() => {
    fetchTestData();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
        
        setSectionTimeRemaining(prev => {
          if (prev <= 1 && currentSection < testData?.sections?.length - 1) {
            handleNextSection();
            return 3600; // 60 minutes
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeRemaining, currentSection, testData]);

  const fetchTestData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken || authToken === 'null') {
        navigate('/Login');
        return;
      }

      const response = await fetch(`/api/mock-tests/test/${testId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setTestData(data.test);
        setTimeRemaining(data.test.duration * 60); // Convert to seconds
        setSectionTimeRemaining(3600); // 60 minutes per section
      } else {
        alert(data.message || 'Failed to start test');
        navigate('/student/mock-tests');
      }
    } catch (error) {
      console.error('Error fetching test data:', error);
      alert('Failed to load test. Please try again.');
      navigate('/student/mock-tests');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setVisitedQuestions(prev => new Set([...prev, questionIndex]));
  };

  const handleAnswerSelect = (answer) => {
    const questionId = getCurrentQuestion()?._id;
    if (questionId) {
      setResponses(prev => ({
        ...prev,
        [questionId]: answer
      }));
      
      // Save response to backend
      saveResponse(questionId, answer);
    }
  };

  const saveResponse = async (questionId, selectedAnswer) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await fetch(`/api/mock-tests/attempt/${attemptId}/response`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questionId,
          selectedAnswer,
          isMarkedForReview: markedForReview.has(currentQuestion)
        })
      });
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleClearResponse = () => {
    const questionId = getCurrentQuestion()?._id;
    if (questionId) {
      setResponses(prev => {
        const newResponses = { ...prev };
        delete newResponses[questionId];
        return newResponses;
      });
      saveResponse(questionId, null);
    }
  };

  const handleNextQuestion = () => {
    const totalQuestions = testData?.sections[currentSection]?.questions?.length || 0;
    if (currentQuestion < totalQuestions - 1) {
      handleQuestionSelect(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      handleQuestionSelect(currentQuestion - 1);
    }
  };

  const handleNextSection = () => {
    if (currentSection < testData?.sections?.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
      setVisitedQuestions(new Set([0]));
      setSectionTimeRemaining(3600);
    }
  };

  const handleSubmitTest = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`/api/mock-tests/attempt/${attemptId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        alert(`Test submitted successfully! Your score: ${data.score}`);
        navigate('/student/mock-tests');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  const getCurrentQuestion = () => {
    return testData?.sections[currentSection]?.questions[currentQuestion];
  };

  const getQuestionStatus = (questionIndex) => {
    const question = testData?.sections[currentSection]?.questions[questionIndex];
    const questionId = question?._id;
    const isAnswered = questionId && responses[questionId];
    const isMarked = markedForReview.has(questionIndex);
    const isVisited = visitedQuestions.has(questionIndex);

    if (isAnswered && isMarked) return 'answered-marked';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    if (isVisited) return 'visited';
    return 'not-visited';
  };

  // Calculator functions
  const handleCalculatorInput = (value) => {
    if (value === 'C') {
      setCalculatorValue('0');
    } else if (value === '=') {
      try {
        const result = eval(calculatorValue.replace(/×/g, '*').replace(/÷/g, '/'));
        setCalculatorValue(result.toString());
      } catch {
        setCalculatorValue('Error');
      }
    } else if (value === '⌫') {
      setCalculatorValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else {
      setCalculatorValue(prev => prev === '0' ? value : prev + value);
    }
  };

  if (loading) {
    return (
      <div className="cat-exam-loading">
        <div className="loading-spinner"></div>
        <p>Loading your test...</p>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="cat-exam-error">
        <h3>Test not found</h3>
        <button onClick={() => navigate('/student/mock-tests')}>
          Back to Mock Tests
        </button>
      </div>
    );
  }

  const currentQuestionData = getCurrentQuestion();
  const totalQuestions = testData?.sections[currentSection]?.questions?.length || 0;

  return (
    <div className="cat-exam-interface">
      {/* Header */}
      <div className="cat-exam-header">
        <div className="exam-header-left">
          <div className="cat-logos">
            <span className="logo-item">CAT</span>
            <span className="logo-item">2024</span>
            <span className="logo-separator">|</span>
            <span className="logo-item">IIM</span>
            <span className="logo-item">AHMEDABAD</span>
            <span className="logo-item">BANGALORE</span>
            <span className="logo-item">CALCUTTA</span>
            <span className="logo-item">KOZHIKODE</span>
            <span className="logo-item">LUCKNOW</span>
            <span className="logo-item">INDORE</span>
            <span className="logo-item">TATHAGAT</span>
          </div>
        </div>
        <div className="exam-header-right">
          <div className="candidate-info">
            <div className="candidate-avatar">
              <span>👤</span>
            </div>
            <div className="candidate-details">
              <span className="candidate-name">John Smith</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="cat-exam-content">
        {/* Left Panel - Question */}
        <div className="cat-question-panel">
          <div className="question-header">
            <div className="section-info">
              <h3>Section {currentSection + 1}: {testData.sections[currentSection].name}</h3>
              <span>Question No. {currentQuestion + 1}</span>
            </div>
            <div className="question-navigation">
              <button 
                className="nav-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button 
                className="nav-btn"
                onClick={handleNextQuestion}
                disabled={currentQuestion === totalQuestions - 1}
              >
                Next →
              </button>
            </div>
          </div>

          <div className="question-content">
            <div className="question-text">
              {currentQuestionData?.questionText?.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            {currentQuestionData?.images?.map((image, index) => (
              <img key={index} src={image} alt={`Question ${index + 1}`} className="question-image" />
            ))}

            <div className="question-options">
              {currentQuestionData?.options?.map((option, index) => {
                const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
                const questionId = currentQuestionData._id;
                const isSelected = responses[questionId] === option;
                
                return (
                  <label key={index} className={`option-label ${isSelected ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={`question-${questionId}`}
                      value={option}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(option)}
                    />
                    <span className="option-indicator">{optionLabel}</span>
                    <span className="option-text">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="question-actions">
            <button className="action-btn secondary" onClick={handleClearResponse}>
              Clear Response
            </button>
            <button 
              className={`action-btn ${markedForReview.has(currentQuestion) ? 'marked' : 'secondary'}`}
              onClick={handleMarkForReview}
            >
              {markedForReview.has(currentQuestion) ? 'Unmark for Review' : 'Mark for Review & Next'}
            </button>
            <button className="action-btn primary" onClick={handleNextQuestion}>
              Save & Next
            </button>
          </div>
        </div>

        {/* Right Panel - Question Palette & Tools */}
        <div className="cat-sidebar-panel">
          {/* Timer */}
          <div className="timer-section">
            <div className="timer-item">
              <span className="timer-label">Time Left</span>
              <span className="timer-value">{formatTime(timeRemaining)}</span>
            </div>
            <div className="timer-item">
              <span className="timer-label">Section Time</span>
              <span className="timer-value">{formatTime(sectionTimeRemaining)}</span>
            </div>
          </div>

          {/* Tools */}
          <div className="tools-section">
            <button 
              className="tool-btn"
              onClick={() => setShowInstructions(true)}
            >
              📋 Instructions
            </button>
            <button 
              className="tool-btn"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              🧮 Calculator
            </button>
            <button 
              className="tool-btn"
              onClick={() => setShowScratchPad(!showScratchPad)}
            >
              📝 Scratch Pad
            </button>
          </div>

          {/* Question Status Legend */}
          <div className="status-legend">
            <h4>Question Status</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span className="status-indicator answered"></span>
                <span>Answered</span>
              </div>
              <div className="legend-item">
                <span className="status-indicator not-answered"></span>
                <span>Not Answered</span>
              </div>
              <div className="legend-item">
                <span className="status-indicator marked"></span>
                <span>Marked for Review</span>
              </div>
              <div className="legend-item">
                <span className="status-indicator answered-marked"></span>
                <span>Answered & Marked</span>
              </div>
              <div className="legend-item">
                <span className="status-indicator visited"></span>
                <span>Not Visited</span>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="question-palette">
            <h4>Choose a Question</h4>
            <div className="palette-grid">
              {testData.sections[currentSection]?.questions?.map((_, index) => (
                <button
                  key={index}
                  className={`palette-btn ${getQuestionStatus(index)} ${currentQuestion === index ? 'current' : ''}`}
                  onClick={() => handleQuestionSelect(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Section Navigation */}
          <div className="section-navigation">
            <div className="section-tabs">
              {testData.sections.map((section, index) => (
                <button
                  key={index}
                  className={`section-tab ${currentSection === index ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSection(index);
                    setCurrentQuestion(0);
                    setVisitedQuestions(new Set([0]));
                  }}
                >
                  {section.name}
                </button>
              ))}
            </div>
            
            <div className="section-actions">
              {currentSection < testData.sections.length - 1 ? (
                <button className="section-btn primary" onClick={handleNextSection}>
                  Next Section →
                </button>
              ) : (
                <button className="section-btn danger" onClick={handleSubmitTest}>
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="modal-overlay">
          <div className="calculator-modal">
            <div className="calculator-header">
              <h4>Calculator</h4>
              <button onClick={() => setShowCalculator(false)}>×</button>
            </div>
            <div className="calculator-display">
              {calculatorValue}
            </div>
            <div className="calculator-buttons">
              {[
                ['C', '⌫', '÷', '×'],
                ['7', '8', '9', '-'],
                ['4', '5', '6', '+'],
                ['1', '2', '3', '='],
                ['0', '.', '', '']
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="calculator-row">
                  {row.map((btn, btnIndex) => (
                    btn && (
                      <button
                        key={btnIndex}
                        className={`calc-btn ${btn === '=' ? 'equals' : ''} ${['C', '⌫'].includes(btn) ? 'function' : ''}`}
                        onClick={() => handleCalculatorInput(btn)}
                      >
                        {btn}
                      </button>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scratch Pad Modal */}
      {showScratchPad && (
        <div className="modal-overlay">
          <div className="scratchpad-modal">
            <div className="scratchpad-header">
              <h4>Scratch Pad</h4>
              <button onClick={() => setShowScratchPad(false)}>×</button>
            </div>
            <textarea
              className="scratchpad-textarea"
              value={scratchPadContent}
              onChange={(e) => setScratchPadContent(e.target.value)}
              placeholder="Use this space for your rough work..."
            />
            <div className="scratchpad-actions">
              <button onClick={() => setScratchPadContent('')}>Clear All</button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="modal-overlay">
          <div className="instructions-modal">
            <div className="instructions-header">
              <h4>Test Instructions</h4>
              <button onClick={() => setShowInstructions(false)}>×</button>
            </div>
            <div className="instructions-content">
              {testData.instructions?.map((instruction, index) => (
                <p key={index}>{instruction}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTestAttempt;
