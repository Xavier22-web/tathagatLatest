// CoursePurchase.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./CoursePurchase.css";
import one from "../../images/one1.png";
import two from "../../images/two2.png";
import three from "../../images/three3.png";
import review from "../../images/REVIEW5.PNG";
import frame from "../../images/frameCourse.png";
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
></link>;

const curriculumData = [
  {
    title: "Welcome! Course Introduction",
    content: "What does the course cover?",
  },
  {
    title: "Foundation Phase – Concept Building",
    content: "",
  },
  {
    title: "Application Phase – Practice & Assignments",
    content: "",
  },
  {
    title: "iCAT Mock Test Series",
    content: "",
  },
  {
    title: "CAT Crash Course – Final Lap",
    content: "",
  },
];

const instructors = [
  {
    name: "Rajat Tathagat",
    expertise: "Quant/LRDI",
    image: three,
  },
  {
    name: "Kumar Abhishek",
    expertise: "Verbal",
    image: two,
  },
  {
    name: "Niraj Naiyar",
    expertise: "Quant/LRDI",
    image: one,
  },
];

const CoursePurchase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;

  const handlePayment = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("❌ Please login again!");
      return;
    }

    try {
      // ✅ 1️⃣ Check if already unlocked
      const checkRes = await fetch(
        "http://localhost:5000/api/user/student/my-courses",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const checkData = await checkRes.json();
     const alreadyUnlocked =
  Array.isArray(checkData?.courses) &&
  checkData.courses.some((c) => c._id === course._id);


      if (alreadyUnlocked) {
        alert("✅ You have already purchased/unlocked this course.");
        return;
      }

      // ✅ 2️⃣ Fetch actual course details
      const courseRes = await fetch(
        `http://localhost:5000/api/courses/student/published-courses/${course._id}`
      );

      const courseData = await courseRes.json();

      if (!courseData.course) {
        alert("❌ Course not found");
        return;
      }

      const amountInPaise = courseData.course.price * 100;

      // ✅ 3️⃣ Create Razorpay order
      const orderRes = await fetch(
        "http://localhost:5000/api/user/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ amount: amountInPaise }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData.success) {
        alert("❌ Failed to create order");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_JLdFnx7r5NMiBS", // Test key for development
        amount: orderData.order.amount,
        currency: "INR",
        name: "Tathagat Academy",
        description: courseData.course.name || "Course Purchase",
        order_id: orderData.order.id,
        handler: function (response) {
          // ✅ 4️⃣ Verify and unlock
          fetch("http://localhost:5000/api/user/payment/verify-and-unlock", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("✅ Verify API response:", data);
              if (data.success) {
                alert("✅ Payment verified & course unlocked!");
                navigate("/student/dashboard");
              } else {
                alert("❌ Payment verification failed: " + data.message);
              }
            })
            .catch((err) => {
              console.error("❌ Verification error:", err);
              alert("❌ Something went wrong. Please contact support.");
            });
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.log(response.error);
        alert("❌ Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (err) {
      console.error("❌ Error in handlePayment:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="course-page container">
      <div className="row">
        {/* Left Section: 60% */}
        <div className="col-lg-9 left-sections">
          {/* YouTube Video Embed */}
          <div className="video-banners">
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/aDXkJwqAiP4?si=gtkt5zJpNyAy7LBS"
              title="Course Intro Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Course Title */}
          <h2 className="course-title">
            CAT 2025 Full Course IIM ABC Practice Batch
          </h2>

          {/* Info Grid Below Title */}
          <div className="info-grid">
            <div className="info-item">
              <span className="icon">👨‍🏫</span>
              <div>
                <div className="label">Instructor</div>
                <div className="value">Kumar Abhishek</div>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📚</span>
              <div>
                <div className="label">Category</div>
                <div className="value">CAT</div>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">👥</span>
              <div>
                <div className="label">Students Enrolled</div>
                <div className="value">200</div>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">⭐</span>
              <div>
                <div className="label">Reviews</div>
                <div className="value">4.8 (Google)</div>
              </div>
            </div>
          </div>

          {/* Tabs + About Section in Left Side */}
          <div className="course-tabs-section">
            <div className="tab-buttons">
              <button className="tab-btn active">📘 Overview</button>
              <button className="tab-btn">📄 Curriculum</button>
              <button className="tab-btn">👤 Instructor</button>
              <button className="tab-btn">⭐ Reviews</button>
            </div>

            <div className="tab-content">
              <h3>About The Course</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.” The
                purpose of lorem ipsum is to create a natural looking block of
                text (sentence, paragraph, page, etc.) that doesn't distract
                from the layout. A practice not without controversy, laying out
                pages with meaningless filler text can be very useful when the
                focus is meant to be on design, not content.
              </p>
              <p>
                The passage experienced a surge in popularity during the 1960s
                when Letraset used it on their dry-transfer sheets, and again
                during the 90s as desktop publishers bundled the text with their
                software. Today it's seen all around the web; on templates,
                websites, and stock designs. Use our generator to get your own,
                or read on for the authoritative history of lorem ipsum.
              </p>
              <p>
                <strong>OR WHAT WILL YOU LEARN??</strong>
              </p>
            </div>
          </div>

          <div className="curriculum-wrapper">
            <h3>The Course Curriculum</h3>
            {curriculumData.map((item, index) => (
              <div
                className={`curriculum-item ${
                  activeIndex === index ? "active" : ""
                }`}
                key={index}
                onClick={() => toggleIndex(index)}
              >
                <div className="curriculum-title">
                  {item.title}

                  <span className="arrow">
                    {activeIndex === index ? "▾" : "▸"}
                  </span>
                </div>

                {activeIndex === index && item.content && (
                  <div className="curriculum-content">{item.content}</div>
                )}
              </div>
            ))}
          </div>

          <div className="instructor-section">
            <h3>Meet Your Instructor</h3>
            <div className="instructor-grid">
              {instructors.map((ins, index) => (
                <div className="instructor-card" key={index}>
                  <div className="instructor-img">
                    <img src={ins.image} alt={ins.name} />
                  </div>
                  <div className="instructor-info">
                    <div>
                      <strong>Name -</strong> {ins.name}
                    </div>
                    <div>
                      <strong>Expertise -</strong> {ins.expertise}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="review-section">
            <h3>Our Valuable Reviews</h3>
            <div className="review-layout">
              {/* Left: Rating Summary */}
              <div className="rating-summary">
                <div>
                  <div className="rating-score">4.0</div>
                  <div className="rating-stars">★★★★★</div>
                  <p className="total-rating">Total 6 Ratings</p>
                </div>

                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div className="bar-line" key={index}>
                      <span className="star">☆</span> <span>{star}</span>
                      <div className="bar">
                        <div
                          className="fill"
                          style={{
                            width: `${star === 5 ? 90 : star === 4 ? 50 : 10}%`,
                          }}
                        ></div>
                      </div>
                      <span className="count">
                        {star === 5 ? 5 : star === 4 ? 1 : 0} Rating
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Just One Image Box */}
              <div className="review-image-box">
                <img src={review} alt="Review Summary" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: 40% */}
        <div className="col-md-3 right-section">
          {/* Course Info Box */}
          <div className="course-info-box">
            <div className="course-title-box">
              {course?.title || "COURSE TITLE"}
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#1A237E",
              }}
            >
              Price:{" "}
              <span style={{ color: "#D32F2F" }}>
                {course?.price || "₹30,000/-"}
              </span>
              <del style={{ marginLeft: "8px", color: "#888" }}>
                {course?.oldPrice || "₹1,20,000/-"}
              </del>
            </div>

            <div
              className="course-description-box"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                paddingRight: "5px",
                fontSize: "15px",
                color: "#333",
                lineHeight: "1.6",
              }}
            >
              <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
                {course?.features?.map((feat, idx) => (
                  <li key={idx} style={{ marginBottom: "6px" }}>
                    {feat}
                  </li>
                )) || <li>No description available.</li>}
              </ul>
            </div>

            <button
              className="buy-btn"
              style={{
                backgroundColor: "#1A237E",
                fontSize: "16px",
                padding: "12px",
                fontWeight: "600",
                borderRadius: "8px",
                marginTop: "15px",
                transition: "0.3s",
              }}
              onClick={handlePayment}
            >
              Buy Now
            </button>
          </div>

          {/* Material Includes Box */}
          <div className="material-box">
            <h4>Material Includes</h4>
            <ul className="material-list">
              <li>Certificate of Completion</li>
              <li>444 downloadable resource</li>
              <li>Full lifetime access</li>
              <li>1300+ Hours of Videos</li>
              <li>20 Mocks & 45 Sectional Mocks</li>
            </ul>
          </div>

          <div className="material-box">
            <h4>Requirements</h4>
            <ul className="material-list">
              <li>Required minimum gradution score to appear in CAT</li>
              <li>50% For General/OBC & 45% For SC/ST/PwD candidates</li>
              <li>
                Final year bachelor's degree candidates or those awaiting their
                result are also eligible to appear for the CAT exam.
              </li>
              <li>
                Candidates with profeessional qualification such as CA/CS/ICWA
                can also appear foe CAT.
              </li>
              <li>10th or 12th scores do not affect the CAT Eligibility</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cat-journey-wrapper">
        <img src={frame} alt="CAT Learning Journey" className="journey-image" />
      </div>
    </div>
  );
};

export default CoursePurchase;
