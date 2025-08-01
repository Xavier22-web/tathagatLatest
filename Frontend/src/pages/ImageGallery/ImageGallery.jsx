import React,{useState} from 'react'
import "./ImageGallery.css"
import scorecardOne from "../../images/ScoreCardOne.png"
import scorecardTwo from "../../images/ScoreCardTwo.png"
import scorecardThree from "../../images/ScoreCardThree.png"
import scorecardFour from "../../images/ScoreCardOne.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";




const faqs = [
  {
    question: "What courses does TathaGat offer?",
    answer:
      "We offer preparation courses for CAT, XAT, SNAP, GMAT, CUET, and other management entrance exams. Our programs include concept classes, question-solving sessions, workshops, strategy sessions, and extensive doubt discussions.",
  },
  {
    question: "What makes TathaGat different from other coaching institutes?",
    answer: "Our personalized mentorship, small batch sizes, and AI-driven analytics set us apart.",
  },
  {
    question: "How can I track my progress at TathaGat?",
    answer: "We provide performance tracking tools, mock tests, and analytics to help you track your progress.",
  },
  {
    question: "Does TathaGat offer online classes?",
    answer: "Yes, we offer both online and offline classes with the same rigor and effectiveness.",
  },
  {
    question: "How do I enroll at TathaGat?",
    answer: "Visit our website or contact our counsellors for enrollment assistance.",
  },
  {
    question: "Can I access recorded lectures of live classes?",
    answer: "Yes, recorded lectures are provided to help you revise and catch up.",
  },
];


const videos = [
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  },
  // Repeat for more video items
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/EHBQ3AJ-uEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EHBQ3AJ-uEo',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/IVnBi5uPHW0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IVnBi5uPHW0',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  } ,{
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/EHBQ3AJ-uEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EHBQ3AJ-uEo',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/IVnBi5uPHW0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IVnBi5uPHW0',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  }, {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/EHBQ3AJ-uEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EHBQ3AJ-uEo',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/IVnBi5uPHW0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IVnBi5uPHW0',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  }, {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/EHBQ3AJ-uEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EHBQ3AJ-uEo',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/IVnBi5uPHW0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IVnBi5uPHW0',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  }, {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/EHBQ3AJ-uEo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=EHBQ3AJ-uEo',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/IVnBi5uPHW0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IVnBi5uPHW0',
  },
  {
    title: 'CAT 2019 100 Percentiler Interview- Topper : Rishi Mittal',
    thumbnail: 'https://img.youtube.com/vi/J_QoDDzzbyI/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=J_QoDDzzbyI',
  }
];


const testimonials = [
  {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg: scorecardOne
  },
  {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg:scorecardTwo
  },
  {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg: scorecardThree
  },
    {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg: scorecardFour
  },
    {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg: scorecardThree
  },
    {
    name: "Abishek Kumar",
    image: "/path-to-image.jpg",
    scoreImg: scorecardOne
  },
];

const ImageGallery = () => {
  
      const [openIndex, setOpenIndex] = useState(null);
       const [activeTab, setActiveTab] = useState("Videos");
       
    
      const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
       const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
  return (
    <>
    <div className="tv-wrapper">
      <div className="tv-background">
        <div className="tv-overlay">
          <div className="tv-left">
            <h1>TathaGat</h1>
            <h2>Toppers’ Meet</h2>
          </div>

          <div className="tv-right">
            <div className="tv-video-card">
              <div className="tv-video-label">Our Featured Videos</div>
              <iframe
                className="tv-video-frame"
                src="https://www.youtube.com/embed/J_QoDDzzbyI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>












   {/* <div className="tv-gallery-wrapper">
      <div className="tv-tabs">
        <button className="tv-tab-active">Videos</button>
        <button className="tv-tab">Photos</button>
      </div>
      <div className="tv-video-grid">
        {videos.map((video, index) => (
          <div className="tv-video-card-grid" key={index}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <div className="tv-thumbnail-container">
                <LazyLoadImage src={video.thumbnail} alt="video" className="tv-thumbnail" />
                <span className="tv-play-icon">▶</span>
              </div>
            </a>
            <p className="tv-video-title">{video.title}</p>
          </div>
        ))}
      </div>
    </div> */}





    
{/* <div className="tv-gallery-wrapper">
  <div className="tv-tabs">
    <button
      className={activeTab === "Videos" ? "tv-tab-active" : "tv-tab"}
      onClick={() => setActiveTab("Videos")}
    >
      Videos
    </button>
    <button
      className={activeTab === "Photos" ? "tv-tab-active" : "tv-tab"}
      onClick={() => setActiveTab("Photos")}
    >
      Photos
    </button>
  </div>

  {activeTab === "Videos" && (
    <div className="tv-video-grid">
      {videos.map((video, index) => (
        <div className="tv-video-card-grid" key={index}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <div className="tv-thumbnail-container">
              <LazyLoadImage
                src={video.thumbnail}
                alt="video"
                className="tv-thumbnail"
              />
              <span className="tv-play-icon">▶</span>
            </div>
          </a>
          <p className="tv-video-title">{video.title}</p>
        </div>
      ))}
    </div>
  )}

  {activeTab === "Photos" && (
    <div className="tv-scorecard-grid">
      {testimonials.map((item, i) => (
        <div className="tv-scorecard" key={i}>
          <LazyLoadImage
            src={item.scoreImg}
            alt="Scorecard"
            className="tv-score-img"
          />
        </div>
      ))}
    </div>
  )}
</div> */}


<div className="tv-gallery-wrapper">
  {/* 🔘 Tabs */}
  <div className="tv-tabs">
    <button
      className={activeTab === "Videos" ? "tv-tab-active" : "tv-tab"}
      onClick={() => setActiveTab("Videos")}
    >
      Videos
    </button>
    <button
      className={activeTab === "Photos" ? "tv-tab-active" : "tv-tab"}
      onClick={() => setActiveTab("Photos")}
    >
      Photos
    </button>
  </div>

  {/* ✅ Show only when active */}
  {activeTab === "Videos" && (
    <div className="tv-video-grid">
      {videos.map((video, index) => (
        <div className="tv-video-card-grid" key={index}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <div className="tv-thumbnail-container">
              <LazyLoadImage
                src={video.thumbnail}
                alt="video"
                className="tv-thumbnail"
              />
              <span className="tv-play-icon">▶</span>
            </div>
          </a>
          <p className="tv-video-title">{video.title}</p>
        </div>
      ))}
    </div>
  )}

  {/* 📸 Photos */}
  {activeTab === "Photos" && (
    <div className="tv-scorecard-grid">
      {testimonials.map((item, i) => (
        <div className="tv-scorecard" key={i}>
          <LazyLoadImage
            src={item.scoreImg}
            alt="Scorecard"
            className="tv-score-img"
          />
        </div>
      ))}
    </div>
  )}
</div>
















      <div className="tv-testimonial-wrapper">
      <div className="tv-left-box">
        <h2>Why Students Trust TathaGat?</h2>
        <p>
          Since 2007, TathaGat has helped thousands crack exams like CAT, XAT,
          GMAT, and SNAP with expert mentors, concept-focused learning, and
          personalized guidance in small batches.
        </p>
        <div className="tv-pill-grid">
          <span className="tv-pill">✅ Personalized Attention</span>
          <span className="tv-pill">✅ Concept- Driven Class</span>
          <span className="tv-pill">✅ Practice Session</span>
          <span className="tv-pill">✅ Doubts And Discussion</span>
          <span className="tv-pill">✅ Mentors With 99+ Percentiles</span>
          <span className="tv-pill">✅ Real-Time Strategy</span>
          <span className="tv-pill">✅ Workshops</span>
        </div>
        <div className="tv-arrow-icon">↗</div>
      </div>

      <div className="tv-right-box">
        <div className="tv-right-header">
          <h3>Top Scorers Score Card</h3>
          <button className="tv-view-all">View all</button>
        </div>

        <div className="tv-scorecard-grid">
          {testimonials.map((item, i) => (
            <div className="tv-scorecard" key={i}>
            
              <LazyLoadImage src={item.scoreImg} alt="Scorecard" className="tv-score-img" />
            </div>
          ))}
        </div>
      </div>
    </div>





      <section className="tv-faq-section">
  <div className="tv-faq-left">
    <h5>GENERAL FAQS</h5>
    <h2>Your Questions,</h2>
    <h2>Answered Clearly and</h2>
    <h2>Concisely</h2>
    <p>
      Find answers to common queries about TathaGat’s courses, teaching methods, tests,
      workshops, mentorship, fees, and more in our FAQs.
    </p>
    <button>Ask your question here</button>
  </div>

  <div className="tv-faq-right">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className={`tv-faq-item ${openIndex === index ? 'open' : ''}`}
        onClick={() => toggleIndex(index)}
      >
        <div className="tv-faq-question">
          <span>{index + 1}. {faq.question}</span>
          <span className="tv-faq-toggle">{openIndex === index ? '−' : '+'}</span>
        </div>
        {openIndex === index && <p className="tv-faq-answer">{faq.answer}</p>}
      </div>
    ))}
  </div>
</section>

    </>
  )
}

export default ImageGallery
