import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MockTestTerms.css';

const MockTestTerms = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [declarations, setDeclarations] = useState({
    readInstructions: false,
    noElectronicDevices: false,
    noExternalAid: false,
    completeTest: false
  });

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(`/api/mock-tests/test/${testId}/details`, {
        headers: authToken ? {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        } : {
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

  const handleDeclarationChange = (key) => {
    setDeclarations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allDeclarationsChecked = Object.values(declarations).every(Boolean);

  const [isStarting, setIsStarting] = useState(false);

  const handleContinue = async () => {
    if (!allDeclarationsChecked) {
      alert('Please agree to all declarations before continuing.');
      return;
    }

    if (isStarting) {
      return; // Prevent double clicks
    }

    setIsStarting(true);

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken || authToken === 'null' || authToken === 'undefined') {
        alert('Please login to start the test');
        navigate('/Login');
        return;
      }

      const response = await fetch(`/api/mock-tests/test/${testId}/start`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Add empty body to prevent stream issues
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Handle both new attempt and existing attempt (resume)
        const attemptId = data.attempt?._id || data.attemptId;
        if (attemptId) {
          navigate(`/student/mock-test/${testId}/attempt/${attemptId}`);
        } else {
          throw new Error('No attempt ID received from server');
        }
      } else {
        alert(data.message || 'Failed to start test');
      }
    } catch (error) {
      console.error('Error starting test:', error);
      alert('Failed to start test. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="cat-terms-page">
        <div className="cat-loading">
          <div className="cat-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!testDetails) {
    return (
      <div className="cat-terms-page">
        <div className="cat-error">
          <h3>Test Not Found</h3>
          <button onClick={() => navigate('/student/dashboard')}>
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cat-terms-page">
      {/* CAT Style Header */}
      <div className="cat-header">
        <div className="cat-header-top">
          <div className="cat-logos">
            <div className="logo-item">CAT</div>
            <div className="logo-item">2024</div>
            <div className="logo-item">IIM</div>
            <div className="logo-item">TATHAGAT</div>
          </div>
          <div className="cat-title">
            <h1>COMMON ADMISSION TEST</h1>
            <h2>Subject Specific Instructions</h2>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="cat-content">
        <div className="cat-main-panel">
          {/* Left Panel - Terms Content */}
          <div className="cat-terms-panel">
            <div className="terms-content">
              <div className="login-section">
                <h3>1. Login</h3>
                <p>
                  Enter your registration number and password following instructions provided by CAT by the Registration.
                </p>
              </div>

              <div className="registration-section">
                <h3>2. Go through the various symbols used in the test and understand their meaning before you start the test.</h3>
              </div>

              <div className="question-section">
                <h3>3. The question paper consists of 3 Sections.</h3>
                
                <div className="sections-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Subject</th>
                        <th>No. of Questions</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>I</td>
                        <td>Verbal Ability and Reading Comprehension (VARC)</td>
                        <td>{testDetails.sections?.find(s => s.name === 'VARC')?.totalQuestions || 24}</td>
                        <td>60 minutes</td>
                      </tr>
                      <tr>
                        <td>II</td>
                        <td>Data Interpretation and Logical Reasoning (DILR)</td>
                        <td>{testDetails.sections?.find(s => s.name === 'DILR')?.totalQuestions || 20}</td>
                        <td>60 minutes</td>
                      </tr>
                      <tr>
                        <td>III</td>
                        <td>Quantitative Ability (QA)</td>
                        <td>{testDetails.sections?.find(s => s.name === 'QA')?.totalQuestions || 22}</td>
                        <td>60 minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="marking-section">
                <h3>4. The Data Interpretation and Logical Reasoning (DILR) section contains 20 questions, with at least some grouping of questions, and you are free as number of sub-questions. Similarly, the Reading Comprehension, such passages consists of a group of four questions. However, within each group, they may vary. You may see questions classified based on four different difficulty levels - easy, easy-medium, medium, and hard. You will find 20 different types of questions and solutions or techniques and are they are number of sub-questions.</h3>
              </div>

              <div className="pwd-section">
                <h3>5. For a Non-MCQ, a candidate will be given 3 different marks for a correct answer, and a 1 point mark for an attempted question. There will be no negative mark for a wrong answer or an Non-MCQ. You will find 20 choice the correct one for each question. However, the choice will be marked automatically only. Each section. Each candidate can attempt all questions. You have to choose the correct one.</h3>
              </div>

              <div className="mcq-section">
                <h3>6. At the time of starting the test, all computer hardware and software offered to you are in working condition.</h3>
              </div>

              <div className="navigation-section">
                <h3>7. Procedure for changing your response:</h3>
                <p>To deselect your chosen answer, click on the question number in the question palette and click on the "Clear Response" button.</p>
                <p>To change your chosen answer, click on the question number in the question palette and click on the new choice of choice and then click on the "Save & Next" or "Mark for Review & Next" button.</p>
                <p>To save your changed answer, you must click on the "Save & Next" or "Mark for Review & Next" button.</p>
              </div>

              <div className="navigation-section">
                <h3>8. Navigating through Sections:</h3>
                <p>At the end of the exam allotted time for sections A, you click on the "Next Section" button. This feature is provided for you to see the entire question paper of a particular section.</p>
                <ul>
                  <li>In the event of you do not click on the "Submit Section" after completing all 20 minute magnifying glass icons at the top of the screen. You can click on the "Question Palette" button (This feature is provided for you to see the entire question paper of the section)</li>
                  <li>Zoom is enabled at 2 levels from the default zoom level, which will be useful for you to access that you may have to scroll down to view the full question and options in some cases.</li>
                </ul>
              </div>

              <div className="device-section">
                <h3>9. I will not declare, publish, transmit, record, store or convey or store of the contents of the CAT in any Information transfer in whole or in part should in any way, verbal or written, electronically or mechanically for any purpose. I am expected not to take any material, any knowledge that you by the Monitoring and Training Services Section and CAT Information transfer is strictly prohibited, and I will be subject to appropriate legal action during the examination.</h3>
              </div>
            </div>
          </div>

          {/* Right Panel - Profile & Declarations */}
          <div className="cat-profile-panel">
            <div className="profile-section">
              <div className="profile-image">
                <div className="profile-avatar">
                  <div className="avatar-placeholder">
                    <span>👤</span>
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h4>JOHN SMITH</h4>
                <p>Candidate</p>
              </div>
            </div>

            <div className="declarations-section">
              <h4>Declaration by a Candidate:</h4>
              
              <div className="declaration-item">
                <label className="cat-checkbox">
                  <input 
                    type="checkbox" 
                    checked={declarations.readInstructions}
                    onChange={() => handleDeclarationChange('readInstructions')}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I have read and understood clearly the Instructions given in the sheet and I am satisfied that all my questions regarding all the instructions, have been taken to the satisfied and/or disciplinary action taken against which may include cancelling my first focus after conducting.
                  </span>
                </label>
              </div>

              <div className="declaration-item">
                <label className="cat-checkbox">
                  <input 
                    type="checkbox" 
                    checked={declarations.noElectronicDevices}
                    onChange={() => handleDeclarationChange('noElectronicDevices')}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I confirm that at the start of the test, all computer hardware and software offered to you are in working condition.
                  </span>
                </label>
              </div>

              <div className="declaration-item">
                <label className="cat-checkbox">
                  <input 
                    type="checkbox" 
                    checked={declarations.noExternalAid}
                    onChange={() => handleDeclarationChange('noExternalAid')}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I will not disclose, publish, reproduce, transmit, store or facilitate transmission and storage of the contents of the CAT in any form or by any means, verbal or written, electronically or mechanically for any purpose.
                  </span>
                </label>
              </div>

              <div className="declaration-item">
                <label className="cat-checkbox">
                  <input 
                    type="checkbox" 
                    checked={declarations.completeTest}
                    onChange={() => handleDeclarationChange('completeTest')}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    I am expected not to attempt to take any information from the content of the CAT by any means. I understand that if I do any such activities during or after the examination, I will be subjected to appropriate legal action.
                  </span>
                </label>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="cat-btn cat-btn-back"
                onClick={() => navigate(-1)}
              >
                Previous
              </button>
              <button 
                className={`cat-btn cat-btn-continue ${!allDeclarationsChecked ? 'disabled' : ''}`}
                onClick={handleContinue}
                disabled={!allDeclarationsChecked}
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestTerms;
