import React, { useState } from 'react';
import defaultImage from "./newstemplate.jpg";
import useStore from '../store/useStore';
import { Bookmark, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const NewsComponent = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  const { bookmarks, addBookmark, removeBookmark } = useStore();
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  
  const articleObj = { title, description, image_url: imageUrl, link: newsUrl, creator: [author], pubDate: date, source_id: source };
  const isBookmarked = bookmarks.some(b => b.link === newsUrl);

  const handleBookmark = (e) => {
    e.preventDefault(); 
    if (isBookmarked) {
      removeBookmark(newsUrl);
    } else {
      addBookmark(articleObj);
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (summary) return; // Already summarized
    
    setIsSummarizing(true);
    setSummaryError('');

    try {
      // Note: React requires you to restart your dev server after adding to .env
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a professional news editor. Summarize the following news article in exactly 2 concise, informative bullet points. Do not include introductory text, just the bullet points. \n\nTitle: ${title}\nDescription: ${description}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setSummary(text);
    } catch (error) {
      console.error("AI Summarization failed:", error);
      if (!process.env.REACT_APP_GEMINI_API_KEY) {
        setSummaryError("API Key is missing. Please restart your terminal server (Ctrl+C then npm start).");
      } else {
        setSummaryError(`Error: ${error.message}`);
      }
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="card h-100 glass-panel" style={{ border: 'none', overflow: 'hidden', borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = 'translateY(-10px)';
           e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 51, 102, 0.2)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = 'var(--card-shadow)';
         }}>
      <div style={{ position: 'relative' }}>
        <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." loading="lazy" style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
        <span className="badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--accent-color)', fontSize: '0.8rem', padding: '5px 10px', borderRadius: '20px', zIndex: 1 }}>
          {source}
        </span>
        <button 
          onClick={handleBookmark}
          className="btn btn-sm position-absolute" 
          style={{ top: '10px', right: '10px', zIndex: 1, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bookmark size={18} fill={isBookmarked ? 'var(--accent-color)' : 'none'} color={isBookmarked ? 'var(--accent-color)' : '#fff'} />
        </button>
      </div>
      <div className="card-body d-flex flex-column" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
        <h5 className="card-title" style={{ fontWeight: '600', marginBottom: '15px' }}>{title}{title && title.length >= 40 ? '...' : ''}</h5>
        <p className="card-text" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{description}{description && description.length >= 50 ? '...' : ''}</p>
        
        {/* AI Summary Section */}
        {summary && (
          <div className="mb-3 p-3" style={{ background: 'var(--bg-secondary)', borderRadius: '10px', borderLeft: '3px solid var(--accent-color)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            <div className="d-flex align-items-center gap-2 mb-2" style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
              <Sparkles size={16} /> AI Summary
            </div>
            <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>') }} />
          </div>
        )}
        
        {summaryError && (
          <div className="text-danger small mb-3">{summaryError}</div>
        )}

        <p className="card-text mt-auto mb-3">
          <small style={{ color: 'var(--text-secondary)' }}>By <span style={{ color: 'var(--accent-color)' }}>{!author ? "Unknown" : author}</span> on {new Date(date).toLocaleDateString()}</small>
        </p>
        
        <div className="d-flex gap-2" style={{ marginTop: 'auto' }}>
          <a href={newsUrl} target="_blank" rel="noreferrer noopener" className="btn btn-modern flex-grow-1 text-center">
            Read More
          </a>
          {!summary && (
            <button onClick={handleSummarize} disabled={isSummarizing} className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2" style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}>
              {isSummarizing ? (
                <div className="spinner-border spinner-border-sm" role="status" style={{ color: 'var(--accent-color)' }}></div>
              ) : (
                <><Sparkles size={18} /> Summarize</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
