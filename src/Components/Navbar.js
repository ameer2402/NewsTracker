import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';
import { Sun, Moon, Bookmark, Search } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, setCountry, country, setSearchQuery, bookmarks } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, setSearchQuery]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top glass-panel" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '1.5rem', letterSpacing: '1px' }}>
            News<span style={{color: 'var(--text-primary)'}}>Tracker</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" style={{ borderColor: 'var(--glass-border)' }}>
            <span className="navbar-toggler-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
                <li className="nav-item" key={cat}>
                  <Link 
                    className={`nav-link text-capitalize ${location.pathname === (cat==='general' ? '/' : `/${cat}`) ? 'active fw-bold' : ''}`} 
                    style={{ color: 'var(--text-primary)' }}
                    to={cat === 'general' ? '/' : `/${cat}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {/* Search */}
              <div className="position-relative d-none d-lg-block">
                <input 
                  type="text" 
                  className="form-control bg-transparent" 
                  placeholder="Search news..." 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--glass-border)', paddingRight: '35px', borderRadius: '20px', width: '200px' }}
                />
                <Search size={18} className="position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              </div>

              {/* Country Selector */}
              <select 
                className="form-select bg-transparent" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                style={{ width: '80px', color: 'var(--text-primary)', borderColor: 'var(--glass-border)', cursor: 'pointer' }}
              >
                <option value="in" style={{color: '#000'}}>IN</option>
                <option value="us" style={{color: '#000'}}>US</option>
                <option value="gb" style={{color: '#000'}}>UK</option>
                <option value="au" style={{color: '#000'}}>AU</option>
              </select>

              {/* Theme Toggle */}
              <button className="btn btn-link p-0" onClick={toggleTheme} style={{ color: 'var(--text-primary)' }}>
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              {/* Bookmarks */}
              <Link to="/bookmarks" className="btn btn-link p-0 position-relative" style={{ color: 'var(--text-primary)' }}>
                <Bookmark size={24} />
                {bookmarks.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {bookmarks.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
