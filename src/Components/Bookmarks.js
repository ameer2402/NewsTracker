import React, { useEffect } from 'react';
import NewsComponent from './NewsComponent';
import useStore from '../store/useStore';
import { BookmarkX } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookmarks = ({ setProgress }) => {
  const { bookmarks } = useStore();

  useEffect(() => {
    document.title = "Bookmarks - NewsTracker";
    setProgress(100);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container' style={{ paddingTop: '90px', paddingBottom: '50px', minHeight: '80vh' }}>
      <h1 className='page-title'>Your Saved <span>Articles</span></h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center mt-5" style={{ color: 'var(--text-secondary)' }}>
          <BookmarkX size={64} style={{ opacity: 0.2, marginBottom: '20px' }} />
          <h3>No bookmarks yet</h3>
          <p>Click the bookmark icon on any article to save it for later.</p>
          <Link to="/" className="btn btn-modern mt-3">Browse News</Link>
        </div>
      ) : (
        <div className="my-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {bookmarks.map((element, index) => (
            <div className="animate-fade-in-up" style={{ animationDelay: `${(index % 10) * 0.1}s` }} key={element.link || index}>
              <NewsComponent 
                title={element.title ? element.title.slice(0, 40) : ""} 
                description={element.description ? element.description.slice(0, 50) : ""} 
                imageUrl={element.image_url}  
                newsUrl={element.link}
                author={element.creator ? element.creator[0] : ""} 
                date={element.pubDate}  
                source={element.source_id}  
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
