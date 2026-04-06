import React, { useState } from 'react';

const ReaderFeedback: React.FC = () => {
  const reviews = [
    {
      stars: 5,
      text: "The ROS 2 module finally made it click. Nodes as smartphone apps — best analogy I've seen after weeks of confusion.",
      author: "AK — Ahmed K., PIAIC Student"
    },
    {
      stars: 5,
      text: "Urdu translation mid-chapter is genuinely useful. Switching between English and Urdu helps so much with difficult concepts.",
      author: "SF — Sara F., CS Student, Lahore"
    },
    {
      stars: 4,
      text: "AI chatbot answers from actual book content — not generic. Would love more Isaac Sim hands-on examples.",
      author: "UR — Usman R., Embedded Engineer"
    }
  ];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleStarHover = (star: number) => {
    setHoverRating(star);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto 60px' }}>
      <div
        className="section-tag"
        style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: '0.9rem',
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        // from our readers
      </div>

      <h2
        className="section-title"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          textAlign: 'center',
          color: 'var(--text)',
          marginBottom: '32px',
        }}
      >
        Reader Feedback.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '22px',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                color: '#f59e0b',
                letterSpacing: '2px',
                marginBottom: '12px',
                fontSize: '1.2rem',
              }}
            >
              {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'italic',
                fontSize: '0.85rem',
                color: 'var(--muted)',
                lineHeight: '1.7',
                marginBottom: '16px',
              }}
            >
              {review.text}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f72585, #a855f7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}
              >
                {review.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: 'var(--text)',
                }}
              >
                {review.author}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Form */}
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '24px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
        }}
      >
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--text)',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          ⭐ Share Your Feedback
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '16px',
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: star <= (hoverRating || rating) ? '#f59e0b' : 'var(--muted)',
                transition: 'color 0.2s ease',
              }}
            >
              {star <= (hoverRating || rating) ? '★' : '☆'}
            </button>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about the textbook..."
          style={{
            width: '100%',
            height: '100px',
            padding: '12px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text)',
            marginBottom: '12px',
            resize: 'vertical',
          }}
        />

        <button
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #f72585, #7b2d8b)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(247,37,133,.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(247,37,133,.2)';
          }}
        >
          Submit Review
        </button>

        <div
          className="connect-label"
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.8rem',
            color: 'var(--muted)',
            textAlign: 'center',
          }}
        >
          // Login required to submit feedback
        </div>
      </div>
    </section>
  );
};

export default ReaderFeedback;