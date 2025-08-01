import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { fetchPublishedCourses } from '../../utils/api';
import DiscussionForum from '../../components/DiscussionForum/DiscussionForum';
import MockTestPage from './MockTests/MockTestPage';
import {
  FiHome,
  FiBook,
  FiVideo,
  FiEdit3,
  FiTarget,
  FiBarChart2,
  FiMessageCircle,
  FiDownload,
  FiCalendar,
  FiBell,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
  FiPlay,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiCheckCircle,
  FiEye,
  FiHeart,
  FiShare2,
  FiFileText
} from 'react-icons/fi';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: 'Student',
    email: 'student@example.com',
    profileImage: null,
    streak: 15,
    totalPoints: 2850
  });
  const [myCourses, setMyCourses] = useState([]);
  const [myCoursesLoading, setMyCoursesLoading] = useState(false);

  // Study Materials state
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);
  const [materialFilters, setMaterialFilters] = useState({
    subject: 'All Subjects',
    type: 'All Types'
  });
  const [downloading, setDownloading] = useState(null);

  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announcementFilters, setAnnouncementFilters] = useState({
    type: 'all'
  });

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedUser && storedAuthToken) {
      setUserDetails({
        name: storedUser.name || 'Student',
        email: storedUser.email || storedUser.phoneNumber || 'student@example.com',
        profileImage: storedUser.profilePic || null,
        streak: 15, // Can be made dynamic later
        totalPoints: 2850 // Can be made dynamic later
      });
    }
  }, []);

  // Function to load courses (can be called for retry)
  const loadCourses = async () => {
    setCoursesLoading(true);
    setCoursesError(null);

    // Test API connectivity first
    try {
      console.log('🔍 Testing API connectivity...');
      const testResponse = await fetch('/api/test');
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log('✅ API test successful:', testData);
      } else {
        console.log('❌ API test failed:', testResponse.status);
      }
    } catch (testError) {
      console.log('❌ API test error:', testError);
    }

    try {
      const response = await fetchPublishedCourses();
      if (response.success) {
        setCourses(response.courses || []);
      } else {
        setCoursesError('Failed to load courses');
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      console.error('Full error object:', error);

      // Set a more user-friendly error message
      if (error.message.includes('Cannot connect')) {
        setCoursesError('Unable to load courses at the moment. Please check your internet connection and try again.');
      } else {
        setCoursesError(error.message || 'Failed to load courses');
      }

      // Don't set fallback data here - let backend handle it
      setCourses([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  // Function to load user's enrolled courses
const loadMyCourses = async () => {
  const authToken = localStorage.getItem('authToken');
  
  if (!authToken) {
    console.warn('⚠️ No auth token found. User not logged in.');
    setMyCourses([]);
    return;
  }

  setMyCoursesLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/user/student/my-courses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`❌ API responded with status ${response.status}`);
      setMyCourses([]);
      return;
    }

    const data = await response.json();
    console.log("📦 My Courses Response:", data);

    if (Array.isArray(data.courses)) {
      setMyCourses(data.courses);
    } else {
      console.warn('⚠️ No "courses" array found in response:', data);
      setMyCourses([]);
    }

  } catch (error) {
    console.error('❌ Error fetching my courses:', error);
    setMyCourses([]);
  } finally {
    setMyCoursesLoading(false);
  }
};


  // Fetch published courses on component mount
  useEffect(() => {
    loadCourses();
    loadMyCourses();
  }, []);

  // Handle enrollment with authentication check
  const handleEnrollNow = async (course) => {
    const authToken = localStorage.getItem('authToken');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if user is logged in
    if (!authToken || !storedUser) {
      // Store course details for after login
      localStorage.setItem('pendingCourse', JSON.stringify(course));
      alert('Please login to enroll in this course!');
      navigate('/login');
      return;
    }

    try {
      // Check if already enrolled
      const response = await fetch('/api/user/student/my-courses', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const alreadyEnrolled = data.courses?.some(c => c._id === course._id);

        if (alreadyEnrolled) {
          alert('✅ You are already enrolled in this course!');
          setActiveSection('courses'); // Switch to My Courses section
          return;
        }
      }

      // Navigate to course purchase page
      navigate('/course-purchase', {
        state: {
          ...course,
          price: course.price || 30000,
          oldPrice: course.oldPrice || 120000,
          features: [
            'Complete CAT preparation material',
            'Live interactive classes',
            'Mock tests and practice sets',
            'Doubt clearing sessions',
            'Performance analysis',
            'Study materials download'
          ]
        }
      });

    } catch (error) {
      console.error('Error checking enrollment:', error);
      // If there's an error, still allow to proceed to purchase
      navigate('/course-purchase', {
        state: {
          ...course,
          price: course.price || 30000,
          oldPrice: course.oldPrice || 120000,
          features: [
            'Complete CAT preparation material',
            'Live interactive classes',
            'Mock tests and practice sets',
            'Doubt clearing sessions',
            'Performance analysis',
            'Study materials download'
          ]
        }
      });
    }
  };

  // Load study materials
  const loadStudyMaterials = async () => {
    setMaterialsLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams({
        ...(materialFilters.subject !== 'All Subjects' && { subject: materialFilters.subject }),
        ...(materialFilters.type !== 'All Types' && { type: materialFilters.type })
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      // Only add Authorization header if we have a valid token
      if (authToken && authToken !== 'null' && authToken !== 'undefined') {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`/api/study-materials/student?${queryParams}`, {
        headers
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStudyMaterials(data.data);
          console.log('✅ Study materials loaded:', data.data.length);
        } else {
          console.error('❌ Failed to load study materials:', data.message);
          setStudyMaterials([]);
        }
      } else {
        console.error('❌ Study materials API error:', response.status);
        setStudyMaterials([]);
      }
    } catch (error) {
      console.error('❌ Error loading study materials:', error);
      setStudyMaterials([]);
    } finally {
      setMaterialsLoading(false);
    }
  };

  // Handle material download
  const handleDownloadMaterial = async (materialId, materialTitle) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'null' || authToken === 'undefined') {
      alert('Please login to download study materials!');
      navigate('/login');
      return;
    }

    setDownloading(materialId);

    try {
      const response = await fetch(`/api/study-materials/download/${materialId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        // Get the file blob
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = materialTitle;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        console.log('✅ Material downloaded successfully');

        // Refresh materials to update download count
        loadStudyMaterials();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to download material');
        console.error('❌ Download failed:', errorData);
      }
    } catch (error) {
      console.error('❌ Error downloading material:', error);
      alert('Failed to download material. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  // Load announcements
  const loadAnnouncements = async () => {
    setAnnouncementsLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const queryParams = new URLSearchParams({
        ...(announcementFilters.type !== 'all' && { type: announcementFilters.type }),
        limit: 20
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      // Only add Authorization header if we have a valid token
      if (authToken && authToken !== 'null' && authToken !== 'undefined') {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`/api/announcements/student?${queryParams}`, {
        headers
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
          console.log('✅ Announcements loaded:', data.data.length);
        } else {
          console.error('❌ Failed to load announcements:', data.message);
          setAnnouncements([]);
        }
      } else {
        console.error('❌ Announcements API error:', response.status);
        setAnnouncements([]);
      }
    } catch (error) {
      console.error('❌ Error loading announcements:', error);
      setAnnouncements([]);
    } finally {
      setAnnouncementsLoading(false);
    }
  };

  // Mark announcement as read
  const markAnnouncementAsRead = async (announcementId) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || authToken === 'null' || authToken === 'undefined') {
      return; // Skip if no auth token
    }

    try {
      await fetch(`/api/announcements/mark-read/${announcementId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('❌ Error marking announcement as read:', error);
    }
  };

  // Load study materials when filters change
  useEffect(() => {
    if (activeSection === 'materials') {
      loadStudyMaterials();
    }
  }, [materialFilters, activeSection]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load announcements when filters change
  useEffect(() => {
    if (activeSection === 'announcements') {
      loadAnnouncements();
    }
  }, [announcementFilters, activeSection]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper functions for announcements
  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'important': return '🚨';
      case 'update': return '📢';
      case 'reminder': return '⏰';
      case 'maintenance': return '🔧';
      default: return '📄';
    }
  };

  const formatAnnouncementDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes} minutes ago`;
      }
      return `${hours} hours ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'courses', label: 'Available Courses', icon: FiBook },
    { id: 'my-courses', label: 'My Courses', icon: FiBook },
    { id: 'live-classes', label: 'Live Classes', icon: FiVideo },
    { id: 'practice-tests', label: 'Practice Tests', icon: FiEdit3 },
    { id: 'mock-tests', label: 'Mock Tests', icon: FiTarget },
    { id: 'analysis', label: 'Analysis & Reports', icon: FiBarChart2 },
    { id: 'doubts', label: 'Doubts & Discussions', icon: FiMessageCircle },
    { id: 'materials', label: 'Study Materials', icon: FiDownload },
    { id: 'schedule', label: 'Schedule', icon: FiCalendar },
    { id: 'announcements', label: 'Announcements', icon: FiBell },
    { id: 'profile', label: 'Profile', icon: FiUser },
  ];

  const renderDashboardContent = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Welcome back, {userDetails.name.split(' ')[0]}! 👋</h1>
        <p>Here's your learning progress today</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiBook />
          </div>
          <div className="stat-info">
            <h3>{courses.length}</h3>
            <p>Available Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiCheckCircle />
          </div>
          <div className="stat-info">
            <h3>85%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiTarget />
          </div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Tests Taken</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-info">
            <h3>{userDetails.streak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="progress-chart-card">
          <h3>Learning Progress</h3>
          <Line
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Study Hours',
                data: [3, 4, 2, 5, 3, 6, 4],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>

        <div className="upcoming-classes-card">
          <h3>Upcoming Classes</h3>
          <div className="class-list">
            <div className="class-item">
              <div className="class-time">
                <FiClock />
                <span>2:00 PM</span>
              </div>
              <div className="class-details">
                <h4>Quantitative Aptitude</h4>
                <p>Advanced Problem Solving</p>
              </div>
              <button className="join-btn">
                <FiPlay /> Join
              </button>
            </div>
            <div className="class-item">
              <div className="class-time">
                <FiClock />
                <span>4:00 PM</span>
              </div>
              <div className="class-details">
                <h4>Verbal Ability</h4>
                <p>Reading Comprehension</p>
              </div>
              <button className="join-btn">
                <FiPlay /> Join
              </button>
            </div>
          </div>
        </div>

        <div className="course-progress-card">
          <h3>Course Progress</h3>
          <Doughnut
            data={{
              labels: ['Completed', 'In Progress', 'Not Started'],
              datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } }
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderMyCoursesContent = () => (
    <div className="courses-content">
      <div className="section-header">
        <h2>My Courses</h2>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">In Progress</button>
          <button className="filter-btn">Completed</button>
        </div>
      </div>

      {myCoursesLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your courses...</p>
        </div>
      ) : myCourses.length === 0 ? (
        <div className="empty-state">
          <FiBook className="empty-icon" />
          <h3>No courses enrolled yet</h3>
          <p>Browse available courses and start learning!</p>
          <button
            className="primary-btn"
            onClick={() => setActiveSection('courses')}
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {myCourses.map((enrollmentData) => {
            const course = enrollmentData.courseId || enrollmentData;
            return (
              <div key={course._id} className="course-card enrolled">
                <div className="course-thumbnail">
                  {course.thumbnail && course.thumbnail !== 'default-course.jpg' ? (
                    <img
                      src={`/uploads/${course.thumbnail}`}
                      alt={course.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="course-thumbnail-placeholder" style={course.thumbnail && course.thumbnail !== 'default-course.jpg' ? {display: 'none'} : {}}>
                    <FiBook />
                  </div>
                  <div className="enrolled-badge">
                    <FiCheckCircle /> Enrolled
                  </div>
                </div>
                <div className="course-details">
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className="status-badge enrolled">
                      {enrollmentData.status === 'unlocked' ? 'Active' : 'Locked'}
                    </span>
                  </div>
                  <p className="course-description">{course.description || 'Start your learning journey'}</p>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '45%'}}></div>
                    </div>
                    <span className="progress-text">45% Complete</span>
                  </div>
                  <div className="course-actions">
                    <button className="continue-btn primary">
                      <FiPlay /> Continue Learning
                    </button>
                    <button className="info-btn">
                      <FiEye /> View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderCoursesContent = () => (
    <div className="courses-content">
      <div className="section-header">
        <h2>Available Courses</h2>
        <div className="filter-buttons">
          <button className="filter-btn active">All Courses</button>
          <button className="filter-btn">Popular</button>
          <button className="filter-btn">Newest</button>
        </div>
      </div>

      {coursesLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      ) : coursesError ? (
        <div className="error-state">
          <p className="error-message">⚠️ {coursesError}</p>
          <button
            className="retry-btn"
            onClick={loadCourses}
            disabled={coursesLoading}
          >
            {coursesLoading ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <FiBook className="empty-icon" />
          <h3>No courses available</h3>
          <p>Check back later for new courses!</p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-thumbnail">
                {course.thumbnail && course.thumbnail !== 'default-course.jpg' ? (
                  <img
                    src={`/uploads/${course.thumbnail}`}
                    alt={course.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="course-thumbnail-placeholder" style={course.thumbnail && course.thumbnail !== 'default-course.jpg' ? {display: 'none'} : {}}>
                  <FiBook />
                </div>
              </div>
              <div className="course-details">
                <div className="course-header">
                  <h3>{course.name}</h3>
                  <span className="price-badge">₹{course.price?.toLocaleString('en-IN') || 'Free'}</span>
                </div>
                <p className="course-description">{course.description || 'No description available'}</p>
                <div className="course-actions">
                  <button
                    className="enroll-btn"
                    onClick={() => handleEnrollNow(course)}
                  >
                    <FiPlay /> Enroll Now
                  </button>
                  <button className="preview-btn">
                    <FiEye /> Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderLiveClassesContent = () => (
    <div className="live-classes-content">
      <div className="section-header">
        <h2>Live Classes</h2>
        <button className="primary-btn">Schedule Class</button>
      </div>

      <div className="classes-calendar">
        <div className="calendar-header">
          <h3>This Week's Schedule</h3>
        </div>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="calendar-day">
              <h4>{day}</h4>
              <div className="day-number">{index + 1}</div>
              {index % 2 === 0 && (
                <div className="class-event">
                  <span className="event-time">2:00 PM</span>
                  <span className="event-title">Quant Class</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="upcoming-sessions">
        <h3>Upcoming Live Sessions</h3>
        <div className="sessions-list">
          {[
            { subject: 'Quantitative Aptitude', topic: 'Number Systems', time: 'Today, 2:00 PM', instructor: 'Prof. Sharma' },
            { subject: 'Verbal Ability', topic: 'Critical Reasoning', time: 'Tomorrow, 4:00 PM', instructor: 'Prof. Verma' },
            { subject: 'Data Interpretation', topic: 'Graphs & Charts', time: 'Friday, 3:00 PM', instructor: 'Prof. Singh' }
          ].map((session, index) => (
            <div key={index} className="session-card">
              <div className="session-info">
                <h4>{session.subject}</h4>
                <p>{session.topic}</p>
                <div className="session-meta">
                  <span><FiClock /> {session.time}</span>
                  <span><FiUser /> {session.instructor}</span>
                </div>
              </div>
              <button className="join-session-btn">
                <FiVideo /> Join Live
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPracticeTestsContent = () => (
    <div className="practice-tests-content">
      <div className="section-header">
        <h2>Practice Tests</h2>
        <div className="test-filters">
          <select className="filter-select">
            <option>All Subjects</option>
            <option>Quantitative Aptitude</option>
            <option>Verbal Ability</option>
            <option>Data Interpretation</option>
          </select>
        </div>
      </div>

      <div className="tests-grid">
        {[
          { subject: 'Quantitative Aptitude', tests: 25, attempted: 18, accuracy: 78 },
          { subject: 'Verbal Ability', tests: 20, attempted: 15, accuracy: 82 },
          { subject: 'Data Interpretation', tests: 18, attempted: 12, accuracy: 75 },
          { subject: 'Logical Reasoning', tests: 22, attempted: 10, accuracy: 80 }
        ].map((test, index) => (
          <div key={index} className="test-subject-card">
            <div className="test-header">
              <h3>{test.subject}</h3>
              <span className="accuracy-badge">{test.accuracy}%</span>
            </div>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-number">{test.tests}</span>
                <span className="stat-label">Total Tests</span>
              </div>
              <div className="stat">
                <span className="stat-number">{test.attempted}</span>
                <span className="stat-label">Attempted</span>
              </div>
              <div className="stat">
                <span className="stat-number">{test.accuracy}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
            <button className="start-test-btn">Start Practice</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMockTestsContent = () => <MockTestPage />;

  const renderAnalysisContent = () => (
    <div className="analysis-content">
      <div className="section-header">
        <h2>Analysis & Reports</h2>
        <div className="date-filter">
          <select>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="analysis-grid">
        <div className="performance-chart">
          <h3>Performance Trend</h3>
          <Line
            data={{
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              datasets: [
                {
                  label: 'Score',
                  data: [65, 70, 68, 75],
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
                {
                  label: 'Accuracy',
                  data: [78, 82, 80, 85],
                  borderColor: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } }
            }}
          />
        </div>

        <div className="subject-wise-analysis">
          <h3>Subject-wise Performance</h3>
          <Bar
            data={{
              labels: ['Quant', 'Verbal', 'DI', 'LR'],
              datasets: [{
                label: 'Accuracy %',
                data: [78, 82, 75, 80],
                backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } }
            }}
          />
        </div>

        <div className="rank-progress">
          <h3>Rank Progress</h3>
          <div className="rank-stats">
            <div className="rank-item">
              <span className="rank-label">Current Rank</span>
              <span className="rank-value">1,245</span>
            </div>
            <div className="rank-item">
              <span className="rank-label">Best Rank</span>
              <span className="rank-value">987</span>
            </div>
            <div className="rank-item">
              <span className="rank-label">Improvement</span>
              <span className="rank-value improvement">+258</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoubtsContent = () => <DiscussionForum />;

  const renderMaterialsContent = () => (
    <div className="materials-content">
      <div className="section-header">
        <h2>Study Materials</h2>
        <div className="materials-filters">
          <select
            value={materialFilters.subject}
            onChange={(e) => setMaterialFilters(prev => ({ ...prev, subject: e.target.value }))}
          >
            <option>All Subjects</option>
            <option>Quantitative Aptitude</option>
            <option>Verbal Ability</option>
            <option>Data Interpretation</option>
            <option>Logical Reasoning</option>
            <option>General Knowledge</option>
          </select>
          <select
            value={materialFilters.type}
            onChange={(e) => setMaterialFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option>All Types</option>
            <option>PDF</option>
            <option>Video</option>
            <option>Practice Sets</option>
            <option>Notes</option>
          </select>
        </div>
      </div>

      <div className="materials-grid">
        {materialsLoading ? (
          <div className="loading-materials">
            <div className="loading-spinner"></div>
            <p>Loading study materials...</p>
          </div>
        ) : studyMaterials.length === 0 ? (
          <div className="no-materials">
            <FiFileText size={48} />
            <h3>No Study Materials Found</h3>
            <p>Check back later for new materials or try different filters.</p>
          </div>
        ) : (
          studyMaterials.map((material) => (
            <div key={material._id} className="material-card">
              <div className="material-icon">
                {material.type === 'PDF' ? <FiDownload /> :
                 material.type === 'Video' ? <FiPlay /> : <FiFileText />}
              </div>
              <div className="material-info">
                <h4>{material.title}</h4>
                <div className="material-meta">
                  <span className="material-type">{material.type}</span>
                  <span className="material-size">{material.fileSize}</span>
                  <span className="material-downloads">{material.downloadCount} downloads</span>
                </div>
                {material.description && (
                  <p className="material-description">{material.description}</p>
                )}
                <div className="material-subject">
                  <small>{material.subject}</small>
                </div>
              </div>
              <div className="material-actions">
                <button
                  className="download-btn"
                  onClick={() => handleDownloadMaterial(material._id, material.title)}
                  disabled={downloading === material._id}
                  title="Download Material"
                >
                  {downloading === material._id ? (
                    <div className="download-spinner"></div>
                  ) : (
                    <FiDownload />
                  )}
                </button>
                <button className="share-btn" title="Share Material">
                  <FiShare2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="schedule-content">
      <div className="section-header">
        <h2>Schedule</h2>
        <div className="view-toggle">
          <button className="toggle-btn active">Week View</button>
          <button className="toggle-btn">Month View</button>
        </div>
      </div>

      <div className="schedule-calendar">
        <div className="calendar-controls">
          <button className="nav-btn">��</button>
          <h3>January 2024</h3>
          <button className="nav-btn">❯</button>
        </div>

        <div className="weekly-schedule">
          {[
            { day: 'Monday', date: '15', events: [{ time: '2:00 PM', title: 'Quant Class', type: 'class' }] },
            { day: 'Tuesday', date: '16', events: [{ time: '4:00 PM', title: 'Mock Test', type: 'test' }] },
            { day: 'Wednesday', date: '17', events: [{ time: '3:00 PM', title: 'Verbal Class', type: 'class' }] },
            { day: 'Thursday', date: '18', events: [{ time: '2:00 PM', title: 'DI Practice', type: 'practice' }] },
            { day: 'Friday', date: '19', events: [{ time: '4:00 PM', title: 'Doubt Session', type: 'doubt' }] },
            { day: 'Saturday', date: '20', events: [{ time: '10:00 AM', title: 'Mock Test', type: 'test' }] },
            { day: 'Sunday', date: '21', events: [] }
          ].map((day, index) => (
            <div key={index} className="schedule-day">
              <div className="day-header">
                <h4>{day.day}</h4>
                <span className="date">{day.date}</span>
              </div>
              <div className="day-events">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className={`event event-${event.type}`}>
                    <span className="event-time">{event.time}</span>
                    <span className="event-title">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnnouncementsContent = () => (
    <div className="announcements-content">
      <div className="section-header">
        <h2>Announcements</h2>
        <div className="announcement-filters">
          <button
            className={`filter-btn ${announcementFilters.type === 'all' ? 'active' : ''}`}
            onClick={() => setAnnouncementFilters(prev => ({ ...prev, type: 'all' }))}
          >
            All
          </button>
          <button
            className={`filter-btn ${announcementFilters.type === 'important' ? 'active' : ''}`}
            onClick={() => setAnnouncementFilters(prev => ({ ...prev, type: 'important' }))}
          >
            Important
          </button>
          <button
            className={`filter-btn ${announcementFilters.type === 'update' ? 'active' : ''}`}
            onClick={() => setAnnouncementFilters(prev => ({ ...prev, type: 'update' }))}
          >
            Updates
          </button>
          <button
            className={`filter-btn ${announcementFilters.type === 'reminder' ? 'active' : ''}`}
            onClick={() => setAnnouncementFilters(prev => ({ ...prev, type: 'reminder' }))}
          >
            Reminders
          </button>
        </div>
      </div>

      <div className="announcements-list">
        {announcementsLoading ? (
          <div className="loading-announcements">
            <div className="loading-spinner"></div>
            <p>Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="no-announcements">
            <FiBell size={48} />
            <h3>No Announcements</h3>
            <p>Check back later for new announcements.</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement._id}
              className={`announcement-card ${announcement.isUnread ? 'unread' : ''}`}
              onClick={() => {
                if (announcement.isUnread) {
                  markAnnouncementAsRead(announcement._id);
                }
              }}
            >
              <div className="announcement-header">
                <h3>
                  {announcement.isPinned && <span className="pin-badge">📌</span>}
                  {getAnnouncementIcon(announcement.type)} {announcement.title}
                </h3>
                <span className="announcement-date">
                  {announcement.timeAgo || announcement.formattedDate || formatAnnouncementDate(announcement.createdAt)}
                </span>
              </div>
              <p>{announcement.content}</p>
              <div className="announcement-actions">
                <span className={`announcement-type ${announcement.type}`}>
                  {announcement.type.toUpperCase()}
                </span>
                <span className={`announcement-priority priority-${announcement.priority}`}>
                  {announcement.priority.toUpperCase()}
                </span>
                {announcement.isUnread && <span className="unread-indicator">New</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="profile-content">
      <div className="section-header">
        <h2>Profile Settings</h2>
        <button className="primary-btn">Save Changes</button>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <FiUser />
            </div>
            <button className="change-avatar-btn">Change Photo</button>
          </div>
          <div className="profile-info">
            <h3>{userDetails.name}</h3>
            <p>{userDetails.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{userDetails.streak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
              <div className="stat">
                <span className="stat-number">{userDetails.totalPoints}</span>
                <span className="stat-label">Total Points</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-form">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={userDetails.name} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" defaultValue={userDetails.email} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 9876543210" />
            </div>
            <div className="form-group">
              <label>Target Exam</label>
              <select>
                <option>CAT 2024</option>
                <option>XAT 2024</option>
                <option>NMAT 2024</option>
              </select>
            </div>
            <div className="form-group">
              <label>Study Goal</label>
              <select>
                <option>95+ Percentile</option>
                <option>90+ Percentile</option>
                <option>85+ Percentile</option>
              </select>
            </div>
            <div className="form-group">
              <label>Current Location</label>
              <input type="text" placeholder="City, State" />
            </div>
          </div>
        </div>

        <div className="preferences-card">
          <h3>Preferences</h3>
          <div className="preferences-list">
            <div className="preference-item">
              <span>Email Notifications</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <span>SMS Reminders</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <span>Performance Analytics</span>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboardContent();
      case 'courses': return renderCoursesContent();
      case 'my-courses': return renderMyCoursesContent();
      case 'live-classes': return renderLiveClassesContent();
      case 'practice-tests': return renderPracticeTestsContent();
      case 'mock-tests': return renderMockTestsContent();
      case 'analysis': return renderAnalysisContent();
      case 'doubts': return renderDoubtsContent();
      case 'materials': return renderMaterialsContent();
      case 'schedule': return renderScheduleContent();
      case 'announcements': return renderAnnouncementsContent();
      case 'profile': return renderProfileContent();
      default: return renderDashboardContent();
    }
  };

  return (
    <div className="student-lms">
      {/* Sidebar */}
      <div className={`lms-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <h2>TathaGat LMS</h2>
          </div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lms-main">
        {/* Top Navigation */}
        <header className="lms-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
              <FiMenu />
            </button>
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search courses, materials..." />
            </div>
          </div>

          <div className="header-right">
            <button className="notification-btn">
              <FiBell />
              <span className="notification-badge">3</span>
            </button>

            <div className="profile-dropdown">
              <button
                className="profile-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="profile-avatar">
                  <FiUser />
                </div>
                <span>{userDetails.name.split(' ')[0]}</span>
                <FiChevronDown />
              </button>

              {profileDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => setActiveSection('profile')}>
                    <FiUser /> Profile
                  </button>
                  <button>
                    <FiBell /> Notifications
                  </button>
                  <hr />
                  <button className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="lms-content">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default StudentDashboard;
