import React, { useState } from "react";
import "./Cat.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
// import student1 from "../src/image/1.png";   
// import student2 from "../src/image/2.png";   
// import student3 from "../src/image/3.png";
import student4 from "../../images/image 38.png";
import student3 from "../../images/image 37.png";

import student2 from "../../images/image 36.png";
import student1 from "../../images/image 35.png";
import contactTeam from "../../images/contactTeams.png";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
// import teamImage from '../assets/team-banner.png';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import team from "../../images/contactTeams.png";
import graph from "../../images/graphTathgat.jpeg";
import graph2 from "../../images/graphTathagat2.jpeg";
import score from "../../images/ScoreCardThree.png";

import footerOne from "../../images/footer1.png";
import footerTwo from "../../images/footer2.png";
import footerThree from "../../images/footer3.png";
import footerFour from "../../images/footer4.png";

import  image1 from "../../images/Toppers/MUDIT RASTOGI.jpg";

import  image3 from "../../images/Toppers/LUV.jpg";

import  image5 from "../../images/Toppers/hARSHIT.jpg";
import  image6 from "../../images/Toppers/ADITYA.jpg";

const Cat = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const data = {
    labels: ["0–60", "60–70", "70–80", "80–90", "90–100"],
    datasets: [
      {
        label: "99+ %ilers",
        data: [20, 40, 60, 80, 100],
        backgroundColor: "#ffc107",
        borderRadius: 8,
      },
    ],
  };

  const blogData = [
    {
      id: 1,
      image: footerOne,
      date: "Feb 24, 2025",
      title: " CAT Preparation , CUET Preparation , XAT Preparation",
    },
    {
      id: 2,
      image: footerTwo,
      date: "Feb 24, 2025",
      title: "CAT Preparation , CUET Preparation , Exam Updates ",
    },
    {
      id: 3,
      image: footerThree,
      date: "Feb 24, 2025",
      title: " CAT Preparation , cat exam 2024 , cat preparation tips",
    },
    {
      id: 4,
      image: footerFour,
      date: "Feb 24, 2025",
      title: "Important points to remember while writing your CAT exam",
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        title: { display: true, text: "Scores", color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#fff" },
        title: { display: true, text: "No. of Scorers", color: "#fff" },
        grid: { color: "#444" },
      },
    },
  };

  const programs = [
    {
      title: "CAT 2025 Full Course",
      image: student4,
      features: [
        "800+ hours of live classes covering QA, VARC, LR-DI, Vocabulary, and GK",
        "AI-driven test analytics with 1000+ mock tests & sectional tests",
        "Personalized mentorship with 24x7 doubt-solving and small batch sizes",
        "GD-PI & WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
      oldPrice: "₹1,20,000/-",
      buttonLabel: "Enroll Now",
      buttonLabel2: "Book Free Demo ",
    },
    // Duplicate or additional items below
    {
      title: "CAT 2025 Full Course",
      image: student4,
      features: [
        "800+ hours of live classes covering QA, VARC, LR-DI, Vocabulary, and GK",
        "AI-driven test analytics with 1000+ mock tests & sectional tests",
        "Personalized mentorship with 24x7 doubt-solving and small batch sizes",
        "GD-PI & WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
      oldPrice: "₹1,20,000/-",
      buttonLabel: "Enroll Now",
      buttonLabel2: "Book Free Demo ",
    },
    {
      title: "CAT 2025 Full Course",
      image: student4,
      features: [
        "800+ hours of live classes covering QA, VARC, LR-DI, Vocabulary, and GK",
        "AI-driven test analytics with 1000+ mock tests & sectional tests",
        "Personalized mentorship with 24x7 doubt-solving and small batch sizes",
        "GD-PI & WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
      oldPrice: "₹1,20,000/-",
      buttonLabel: "Enroll Now",
      buttonLabel2: "Book Free Demo ",
    },
    {
      title: "CAT 2025 Full Course",
      image: student4,
      features: [
        "800+ hours of live classes covering QA, VARC, LR-DI, Vocabulary, and GK",
        "AI-driven test analytics with 1000+ mock tests & sectional tests",
        "Personalized mentorship with 24x7 doubt-solving and small batch sizes",
        "GD-PI & WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
      oldPrice: "₹1,20,000/-",
      buttonLabel: "Enroll Now",
      buttonLabel2: "Book Free Demo ",
    },
  ];

  const courseData = [
    {
      title: "CAT 2025 Full Course",
      description: [
        "800+ hours of live classes covering QA, VARC, LR-DI, vocabulary, and GK",
        "All-India test analytics with 1000+ mock tests & sectional tests",
        "1-on-1 mentorship with 24x7 doubt solving and personal mentors",
        "GD-PI-WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
    },
    {
      title: "CAT 2025 Full Course",
      description: [
        "800+ hours of live classes covering QA, VARC, LR-DI, vocabulary, and GK",
        "All-India test analytics with 1000+ mock tests & sectional tests",
        "1-on-1 mentorship with 24x7 doubt solving and personal mentors",
        "GD-PI-WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
    },
    {
      title: "CAT 2025 Full Course",
      description: [
        "800+ hours of live classes covering QA, VARC, LR-DI, vocabulary, and GK",
        "All-India test analytics with 1000+ mock tests & sectional tests",
        "1-on-1 mentorship with 24x7 doubt solving and personal mentors",
        "GD-PI-WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
    },
    {
      title: "CAT 2025 Full Course",
      description: [
        "800+ hours of live classes covering QA, VARC, LR-DI, vocabulary, and GK",
        "All-India test analytics with 1000+ mock tests & sectional tests",
        "1-on-1 mentorship with 24x7 doubt solving and personal mentors",
        "GD-PI-WAT training for final B-school selection",
        "Flexible learning options – weekday & weekend batches available",
      ],
      price: "₹30,000/-",
    },
  ];

  const scorers = [
    {
      name: "Abhishek Kumar",
      photo: "https://i.pravatar.cc/150?img=1",
      percentile: "99.9%",
      section1: "QA: 99.85",
      section2: "DILR: 97.1",
      section3: "VARC: 98.2",
    },
    {
      name: "Abishek Kumar",
      photo: "https://i.pravatar.cc/150?img=2",
      percentile: "99.9%",
      section1: "QA: 95.5",
      section2: "DILR: 97.1",
      section3: "VARC: 96.3",
    },
    {
      name: "Abhishek Kumar",
      photo: "https://i.pravatar.cc/150?img=3",
      percentile: "99.9%",
      section1: "QA: 98.5",
      section2: "DILR: 97.1",
      section3: "VARC: 94.2",
    },
  ];

  const data1 = [
    {
      year: "2021",
      a: "99.5",
      b: "99.7",
      c: "99.6",
      d: "97.5",
      e: "95.5",
      f: "96.0",
    },
    {
      year: "2022",
      a: "99.4",
      b: "99.6",
      c: "99.5",
      d: "97.2",
      e: "95.0",
      f: "95.8",
    },
    {
      year: "2023",
      a: "99.2",
      b: "99.5",
      c: "99.4",
      d: "96.0",
      e: "94.8",
      f: "95.5",
    },
    {
      year: "2024",
      a: "99.0",
      b: "99.4",
      c: "99.3",
      d: "96.5",
      e: "94.5",
      f: "95.2",
    },
  ];

  const feedbackImages = [
    "/feedbacks/f1.png",
    "/feedbacks/f2.png",
    "/feedbacks/f3.png",
    "/feedbacks/f4.png",
    "/feedbacks/f5.png",
    "/feedbacks/f6.png",
    "/feedbacks/f7.png",
    "/feedbacks/f8.png",
    "/feedbacks/f9.png",
    "/feedbacks/f10.png",
    "/feedbacks/f11.png",
    "/feedbacks/f12.png",
  ];
  // const [showAll, setShowAll] = useState()
  const [showAll, setShowAll] = useState(false);

  const visibleCourses = showAll ? programs : programs.slice(0, 2);
  return (
    <div>
      <>
        <section className="ttp-hero-container">
          <div className="ttp-hero-content">
            <div className="ttp-hero-left">
              <div className="ttp-info-card">
                <span className="ttp-info-badge">Since 2007</span>

                <div className="ttp-info-icon">🎧</div>

                <p className="ttp-info-text">
                  Unlimited 1-To-1 <br />
                  Doubt Sessions & <br />
                  24x7 Assistance
                </p>

                <div className="ttp-info-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>

              <div className="ttp-hero-headings">
                <p className="ttp-hero-topline">
                  CRACK THE CAT. UNLOCK YOUR DREAM B-School.
                </p>

                <h1 className="ttp-hero-title">
                  India’s Most Trusted <br /> CAT Coaching Institute
                </h1>

                <p className="ttp-hero-tags">
                  99+ percentiler mentors | Concept-based learning | Personalized
                  strategy
                </p>

                <div className="ttp-hero-buttons">
                  <button className="ttp-btn ttp-btn-primary">
                    Start Your Prep
                  </button>
                  <button className="ttp-btn ttp-btn-secondary">
                    Download Free Resources
                  </button>
                </div>
              </div>

              <div className="ttp-floating-links">
                <button>Events</button>
                <button>Trainer</button>
                <button>Process</button>
                <button>Curriculum</button>
                <button>Certification</button>
                <button>FAQs</button>
              </div>
            </div>

            <div className="ttp-bottom-flex-row">
              <div className="ttp-review-box">
                <div className="ttp-review-stars">
             
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                  <span className="star">⭐</span>
                </div>
                <p className="ttp-review-text">
                  Trusted by 1,000+ <br />
                  Students on Their CAT Journey
                </p>
              </div>

              <div className="ttp-image-box">
                <LazyLoadImage
                  src={contactTeam}
                  alt="Team"
                  style={{ width: "100%", borderRadius: "12px" }}
                />
              </div>

              <div className="ttp-success-box-info">
                <div className="ttp-avatar-stack">
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=1" alt="avatar" />
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=2" alt="avatar" />
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=3" alt="avatar" />
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=4" alt="avatar" />
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=5" alt="avatar" />
                  <LazyLoadImage src="https://i.pravatar.cc/40?img=6" alt="avatar" />
                </div>

                <p className="ttp-success-text">
                  1700+ Success Stories <span className="arrow">→</span>
                </p>
              </div>
            </div>

            <div className="ttp-hero-curve">
              <svg
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{ width: "100%", height: "120px", display: "block" }}
              >
                <path
                  fill="#ffffff"
                  d="M0,0 C480,180 960,180 1440,0 L1440,320 L0,320 Z"
                />
              </svg>
            </div>
          </div>
        </section>

        <section className="tgw-cat-section">
          <div className="tgw-container">
            <h2 className="tgw-heading">What Is CAT And Why It Matters</h2>
            <p className="tgw-subtext">
              The Common Admission Test (CAT) is India’s premier management
              entrance exam for IIMs and top B <br />
              -Schools.It tests your Quantitative Ability, Verbal Ability, Data
              Interpretation, and Logical Reasoning under <br />
              intense time pressure.
            </p>

            <div className="tgw-info-boxes">
              <div className="tgw-info-card">
                <p className="tgw-info-title">Exam Duration</p>
                <p className="tgw-info-value">2 hours</p>
              </div>
              <div className="tgw-info-card">
                <p className="tgw-info-title">Sections</p>
                <p className="tgw-info-value">VARC | DILR | QA</p>
              </div>
              <div className="tgw-info-card">
                <p className="tgw-info-title">Marking</p>
                <p className="tgw-info-value">+3 for correct, -1 for wrong</p>
              </div>
            </div>

            <div className="tgw-whycat">
              <div>
                <div id="manf">
                  <div className="tgw-why-box">
                    <h3>Why CAT matters?</h3>
                    <p>
                      Since 2007, TathaGat has helped thousands crack exams like
                      CAT, XAT, GMAT, and SNAP with expert mentors,
                      concept-focused learning, and personalized guidance in
                      small batches.
                    </p>
                    <div className="tgw-tags">
                      <span>Gateway To Top B-Schools</span>
                      <span>Career Acceleration</span>
                      <span>Global Opportunities</span>
                      <span>Personal Transformation</span>
                    </div>
                  </div>
                </div>
                <div id="manr">
                  <div className="tgw-videos">
                    {[1, 2, 3].map((v, i) => (
                      <div className="tgw-video-card" key={i}>
                        <iframe
                          width="100%"
                          height="250"
                          src="https://www.youtube.com/embed/1x9lbk01Tn4"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div style={{display:"flex",flexDirection:"row",gap:"20px"}}>
                        <p>Simran Kaur</p>
                        <strong style={{color:"#FFC107"}}>CAT 99.53%</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tgr-classroom">
          <div className="tgr-container">
            <h2 className="tgr-heading">
              Real classroom energy. Real concept clarity.
            </h2>
            <p className="tgr-subtext">
              Before you join us, see how we teach. Watch demo clips from our
              top faculty as they break down concepts,share <br />
              strategies, and make learning engaging and effective.
            </p>

            <div className="tgr-filters">
              <button className="tgr-btn tgr-active">All Categories</button>
              <button className="tgr-btn">QUANT</button>
              <button className="tgr-btn">VARC</button>
              <button className="tgr-btn">LRDI</button>
            </div>

            <div className="tgr-video-grid">
              {[1, 2, 3, 4].map((video) => (
                <div className="tgr-video-card" key={video}>
                  <div className="tgr-video-thumbnail">
                    <iframe
                      width="100%"
                      height="200"
                      src="https://www.youtube.com/embed/1x9lbk01Tn4"
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="tgr-yt-frame"
                    ></iframe>
                  </div>
                  <div className="tgr-video-info">
                    <p className="tgr-video-label">Watch Video</p>
                    <h4 className="tgr-video-title">
                      Time & Work in 5 Minutes
                    </h4>
                    <p className="tgr-video-author">By Ayush Kumar</p>
                    <a
                      className="tgr-watch-link"
                      href="https://youtu.be/1x9lbk01Tn4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      <section className="tgc-score">
  <div className="tgc-container">
    {/* Left Graph */}
    <div className="tgc-graph-area">
      <div className="tgc-graph-box">
        <h4 className="tgc-graph-title">Score Graph for CAT Scorers</h4>
        <p className="tgc-graph-subtitle">99+ percentilers from TathaGat</p>
        <div className="tgcs-image-box">
          <LazyLoadImage
            src={graph2}
            alt="Score Graph"
            className="tgcs-fixed-img"
          />
        </div>
      </div>
    </div>

    {/* Right Topper Cards */}
    <div className="tgc-toppers">
      {[
        {
          name: "Harshit Bhalla",
          score: "99.83 %ILE",
          img: image1,
        },
        {
          name: "Raghav Garg",
          score: "99.33 %ILE",
          desc: "Reference site about Lorem Ipsum, giving information on its origins...",
           img: image3,
        },
        {
          name: "Sanjana Singh",
          score: "99.32 %ILE",
         img: image6,
        },
        {
          name: "Arav Jain",
          score: "99.2 %ILE",
           img:image5,
        },
      ].map((student, i) => (
        <div className="tgc-topper-card" key={i}>
          <LazyLoadImage src={student.img} alt={student.name} />
          <h4>{student.name}</h4>
          {student.desc && <p className="tgc-desc">{student.desc}</p>}
          <p className="tgc-score-text">{student.score}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        <section className="tspp-programs-section">
          <div className="tspp-programs-header">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <h5>our Courses</h5>
              <h2>Tailored for Your Success</h2>
            </div>
            <div>
              <p>
                At Tathagat, we offer comprehensive and specialized programs
                designed to help students excel in CAT, XAT, SNAP, GMAT, and
                other management entrance exams. Whether you're a beginner or
                looking for advanced training, we have the perfect program for
                you!
              </p>
            </div>
          </div>

          <div className="tspp-programs-actions">
            <button>
              <i className="fa fa-filter"></i> Cat
            </button>
            <button>
              <i className="fa fa-filter"></i> Year
            </button>
            <button>
              <i className="fa fa-balance-scale"></i> Course Comparison
            </button>
          </div>

          <div className="tspp-programs-grid">
            {visibleCourses.map((item, index) => (
              <div className="tspp-program-card" key={index}>
                <div className="tspp-program-image">
                  <LazyLoadImage effect="blur" src={item.image} alt={item.title} />
                  <div className="tspp-badge">Full Course</div>
                </div>
                <div className=" tspp-program-content">
                  <h3>{item.title}</h3>
                  <ul>
                    {item.features.map((feat, idx) => (
                      <li key={idx}>✔ {feat}</li>
                    ))}
                  </ul>
                  <div className="tspp-program-price-row">
                    <div>
                      <h4>{item.price}</h4>
                      <del>{item.oldPrice}</del>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <button>{item.buttonLabel}</button>
                      <button>{item.buttonLabel2}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAll && (
            <div className="tspp-show-all-button">
              <button onClick={() => setShowAll(true)}>Show All</button>
            </div>
          )}
        </section>



        <div className="cat-syllabus-container">
          <div className="cat-syllabus-left">
            <h1 className="cat-syllabus-title">CAT 2025 Syllabus</h1>
            <div className="cat-syllabus-tabs">
              <button className="cat-tab active">
                CAT 2025 QUANT Syllabus
              </button>
              <button className="cat-tab">CAT 2025 VARC Syllabus</button>
              <button className="cat-tab">CAT 2025 DILR Syllabus</button>
            </div>

            <h3 className="cat-section-title">
              Quant Section in CAT – Topic wise question distribution
            </h3>
            <table className="cat-syllabus-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>CAT 2022</th>
                  <th>CAT 2023</th>
                  <th>CAT 2024</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Arithmetic</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Averages, Ratio & Proportion</td>
                  <td>5</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>Profit and Loss, Interest</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Time, Distance and Work</td>
                  <td>1</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Algebra</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Quadratic & Polynomial Equations</td>
                  <td>1</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Linear Equations & Inequalities</td>
                  <td>2</td>
                  <td>3</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Logarithms, Surds & Indices</td>
                  <td>1</td>
                  <td>0</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Geometry & Mensuration</td>
                  <td>3</td>
                  <td>2</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Number Systems</td>
                  <td>3</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Progressions and Series</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Functions and Graphs</td>
                  <td>1</td>
                  <td>0</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Probability & Combinatorics</td>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Functions and Graphs</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cat-syllabus-right">
            <div className="cat-trust-box">
              <div className="cat-mentors">
                <LazyLoadImage src={team} alt="Mentors" />
              </div>
              <div className="cat-trust-content">
                <h3>Why Students Trust TathaGat?</h3>
                <p className="cat-trust-desc">
                  Since 2007, TathaGat has helped thousands crack exams like
                  CAT, XAT, GMAT, and SNAP with expert mentors, concept-focused
                  learning, and personalized guidance in small batches.
                </p>
                <ul className="cat-benefits">
                  <li>🟡 Personalized Attention</li>
                  <li>🟡 Concept-driven class</li>
                  <li>🟡 Practice Session</li>
                  <li>🟡 Doubts And Discussion</li>
                  <li>🟡 Mentors With 99+ Percentiles</li>
                  <li>🟡 Real-Time Strategy</li>
                  <li>🟡 Workshops</li>
                </ul>
                <div className="cat-support-box">
                  <h4>24*7 Support</h4>
                  <p>
                    TathaGat offers unlimited one-on-one doubt sessions, live
                    class doubt resolution, and round-the-clock assistance,
                    ensuring no query goes unanswered. Expert mentorship
                    provides continuous support, boosting confidence and
                    enhancing problem-solving skills for exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="tgv-top-section">
          <div className="tgv-top-header">
            <h2 className="tgv-top-heading">100%ile In CAT!</h2>
            <button className="tgv-view-btn">View all</button>
          </div>

          <div className="tgv-top-content">
            <div className="tgv-cards-container">
              {scorers.map((s, i) => (
                <div className="tgv-card" key={i}>
                  <LazyLoadImage src={score} alt="" className="img1"></LazyLoadImage>
                </div>
              ))}
            </div>

            <div className="tgv-know-box">
              <h3 className="tgv-know-title">Know Us</h3>
              <p className="tgv-know-text">
                <strong>TathaGat</strong> was established in 2007 by Rajat
                Tathagat with a vision to revolutionize MBA entrance exam
                preparation. With a student-first approach, TathaGat focuses on
                concept clarity, rigorous practice, and personalized mentoring
                to help aspirants achieve 99+ percentiles. Over the years, it
                has built a reputation for innovative pedagogy, expert faculty,
                and exceptional success rates.
              </p>
              <button className="tgv-about-btn">About Us</button>
            </div>
          </div>
        </section>



        <div id="graph">
          <div className="tgt-growth-wrapper">
            <LazyLoadImage
              src={graph}
              alt="TathaGat Growth Chart"
              className="tgt-growth-img"
            />
          </div>

          <div className="tgi-iim-table-container">
            <h2 className="tgi-iim-title">IIM Calls Vs Percentile</h2>
            <div className="tgi-iim-table-wrapper">
              <table className="tgi-iim-table">
                <thead>
                  <tr>
                    <th className="tgi-header red">Year</th>
                    <th className="tgi-header green">IIM Ahmedabad</th>
                    <th className="tgi-header pink">IIM Bangalore</th>
                    <th className="tgi-header orange">IIM Calcutta</th>
                    <th className="tgi-header yellow">IIM Lucknow</th>
                    <th className="tgi-header purple">IIM Kozhikode</th>
                    <th className="tgi-header cyan">IIM Indore</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((row, i) => (
                    <tr key={i}>
                      <td id="td11">{row.year}</td>
                      <td id="td1">{row.a}</td>
                      <td id="td2">{row.b}</td>
                      <td id="td3">{row.c}</td>
                      <td id="td4">{row.d}</td>
                      <td id="td5">{row.e}</td>
                      <td id="td6">{row.f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tga-feedback-section">
            <div className="tga-feedback-header">
              <h2>TathaGat Toppers Feedback</h2>
              <button className="tga-viewall-btn">View All</button>
            </div>
            <div className="tga-feedback-grid">
              {feedbackImages.map((src, index) => (
                <div className="tga-feedback-card" key={index}>
                  <LazyLoadImage src={score} alt="" className="tga-feedback-img"></LazyLoadImage>
                </div>
              ))}
            </div>
          </div>
        </div>


<section className="tm-blog-slider-wrapper">
        <div className="tm-blog-header">
          <div>
            <p className="tm-headerBlog">Explore our blog</p>
            <h2>
              Unlock Success Through <br /> Knowledge
            </h2>
          </div>
          <div>
            <p>
              Stay informed with the latest articles, tips, and strategies from
              TathaGat. From exam preparation guides to success stories, our
              blog covers everything you need to excel in CAT, XAT, SNAP, GMAT,
              CUET, and more.
            </p>
          </div>
        </div>

        <div className="tm-blog-filter-buttons">
          {[
            "All",
            "Top Blogs",
            "Topper Journeys",
            "MBA",
            "IIT JEE",
            "NEET",
            "Study Aboard",
            "After 12th",
          ].map((tag, idx) => (
            <button key={idx}>{tag}</button>
          ))}
        </div>

        <div className="tm-blog-cards-container">
          {blogData.map((blog) => (
            <div key={blog.id} className="tm-blog-card">
              < LazyLoadImage
                src={blog.image}
                alt="tm-blog thumbnail"
                className="tm-blog-image"
              />
              <div className="tm-blog-info">
                <span className="tm-blog-date">
                  <FaCalendarAlt /> {blog.date}
                </span>
                <h4>{blog.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="tm-Blog-Footer-Main">
          <div className="tm-blog-footer">
            <button className="tm-arrow-button">
              <FaArrowLeft />
            </button>
            <div className="tm-slider-indicator" />
            <button className="tm-arrow-button">
              <FaArrowRight />
            </button>
          </div>

          <div className="tm-view-all-button">
            <button>View all</button>
          </div>
        </div>
      </section>


      </>
    </div>
  );
}

export default Cat;
