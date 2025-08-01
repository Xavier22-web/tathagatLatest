import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MockTestInstructions.css';
import {
  FiClock,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiMonitor,
  FiWifi,
  FiVolumeX,
  FiEdit3,
  FiArrowLeft,
  FiPlay
} from 'react-icons/fi';

const MockTestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken || authToken === 'null' || authToken === 'undefined') {
        alert('Please login to access the test');
        navigate('/student/dashboard');
        return;
      }

      const response = await fetch(`/api/mock-tests/test/${testId}/details`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setTestDetails(data.test);
      } else {
        console.error('Failed to fetch test details:', data.message);
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Error fetching test details:', error);
      navigate('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions before starting the test.');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch(`/api/mock-tests/test/${testId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        // Navigate to actual test page
        navigate(`/student/mock-test/${testId}/attempt/${data.attempt._id}`);
      } else {
        alert(data.message || 'Failed to start test');
      }
    } catch (error) {
      console.error('Error starting test:', error);
      alert('Failed to start test. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="mock-instructions-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading test instructions...</p>
        </div>
      </div>
    );
  }

  if (!testDetails) {
    return (
      <div className="mock-instructions-page">
        <div className="error-state">
          <FiAlertTriangle size={48} />
          <h3>Test Not Found</h3>
          <p>The requested test could not be found.</p>
          <button onClick={() => navigate('/student/dashboard')}>
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mock-instructions-page">
      <div className="instructions-container">
        {/* Header */}
        <div className="instructions-header">
          <button 
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft /> Back
          </button>
          <div className="test-info">
            <h1>{testDetails.title}</h1>
            <div className="test-meta">
              <span><FiClock /> {testDetails.duration} minutes</span>
              <span><FiFileText /> {testDetails.totalQuestions} questions</span>
              <span><FiEdit3 /> {testDetails.totalMarks} marks</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="instructions-content">
          <div className="instructions-left">
            {/* General Instructions */}
            <div className="instruction-section">
              <h2><FiFileText /> General Instructions</h2>
              <div className="instruction-list">
                <div className="instruction-item">
                  <FiCheckCircle className="icon success" />
                  <div>
                    <strong>Test Duration:</strong> This test has a total duration of {testDetails.duration} minutes
                  </div>
                </div>
                <div className="instruction-item">
                  <FiCheckCircle className="icon success" />
                  <div>
                    <strong>Questions:</strong> The test contains {testDetails.totalQuestions} questions for {testDetails.totalMarks} marks
                  </div>
                </div>
                <div className="instruction-item">
                  <FiCheckCircle className="icon success" />
                  <div>
                    <strong>Navigation:</strong> You can navigate between questions using Next/Previous buttons
                  </div>
                </div>
                <div className="instruction-item">
                  <FiCheckCircle className="icon success" />
                  <div>
                    <strong>Review:</strong> You can review and change your answers before final submission
                  </div>
                </div>
                <div className="instruction-item">
                  <FiAlertTriangle className="icon warning" />
                  <div>
                    <strong>Auto Submit:</strong> The test will be automatically submitted when time expires
                  </div>
                </div>
              </div>
            </div>

            {/* Section-wise Instructions */}
            {testDetails.sections && testDetails.sections.length > 0 && (
              <div className="instruction-section">
                <h2><FiEdit3 /> Section Details</h2>
                <div className="sections-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Section Name</th>
                        <th>Questions</th>
                        <th>Time (mins)</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testDetails.sections.map((section, index) => (
                        <tr key={index}>
                          <td>{section.name}</td>
                          <td>{section.totalQuestions}</td>
                          <td>{section.timeLimit}</td>
                          <td>{section.totalMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Marking Scheme */}
            <div className="instruction-section">
              <h2><FiEdit3 /> Marking Scheme</h2>
              <div className="marking-scheme">
                <div className="marking-item positive">
                  <span className="mark">+{testDetails.positiveMarks || 3}</span>
                  <span>Correct Answer</span>
                </div>
                <div className="marking-item negative">
                  <span className="mark">-{testDetails.negativeMarks || 1}</span>
                  <span>Wrong Answer</span>
                </div>
                <div className="marking-item neutral">
                  <span className="mark">0</span>
                  <span>Not Attempted</span>
                </div>
              </div>
            </div>
          </div>

          <div className="instructions-right">
            {/* System Requirements */}
            <div className="instruction-section">
              <h3><FiMonitor /> System Requirements</h3>
              <div className="requirement-list">
                <div className="requirement-item">
                  <FiWifi className="icon" />
                  <span>Stable internet connection</span>
                </div>
                <div className="requirement-item">
                  <FiMonitor className="icon" />
                  <span>Updated web browser</span>
                </div>
                <div className="requirement-item">
                  <FiVolumeX className="icon" />
                  <span>Quiet environment</span>
                </div>
              </div>
            </div>

            {/* Important Guidelines */}
            <div className="instruction-section">
              <h3><FiAlertTriangle /> Important Guidelines</h3>
              <div className="guidelines">
                <ul>
                  <li>Do not refresh the page during the test</li>
                  <li>Do not use browser back/forward buttons</li>
                  <li>Ensure you have stable internet connection</li>
                  <li>Complete the test in one sitting</li>
                  <li>Submit the test before time expires</li>
                </ul>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="instruction-section">
              <div className="terms-agreement">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  I have read and understood all the instructions and agree to the terms and conditions
                </label>
              </div>
            </div>

            {/* Start Test Button */}
            <div className="start-test-section">
              <button
                className={`start-test-btn ${!agreedToTerms ? 'disabled' : ''}`}
                onClick={handleStartTest}
                disabled={!agreedToTerms}
              >
                <FiPlay /> Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestInstructions;
