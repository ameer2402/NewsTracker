import React, { Component } from 'react';
import defaultImage from "./newstemplate.jpg";

export class NewsComponent extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    
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
          <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
          <span className="badge" style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--accent-color)', fontSize: '0.8rem', padding: '5px 10px', borderRadius: '20px', zIndex: 1 }}>
            {source}
          </span>
        </div>
        <div className="card-body d-flex flex-column" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
          <h5 className="card-title" style={{ fontWeight: '600', marginBottom: '15px' }}>{title}{title && title.length >= 40 ? '...' : ''}</h5>
          <p className="card-text" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{description}{description && description.length >= 50 ? '...' : ''}</p>
          <p className="card-text mt-auto mb-3">
            <small style={{ color: 'var(--text-secondary)' }}>By <span style={{ color: 'var(--accent-color)' }}>{!author ? "Unknown" : author}</span> on {new Date(date).toLocaleDateString()}</small>
          </p>
          <a href={newsUrl} target="_blank" rel="noreferrer noopener" className="btn btn-modern w-100 text-center" style={{ marginTop: 'auto' }}>
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
