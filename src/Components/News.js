import React, { useState, useEffect } from 'react';
import NewsComponent from './NewsComponent';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useStore from '../store/useStore';
import { AlertCircle } from 'lucide-react';

const News = ({ category, setProgress, pagesize }) => {
    const { country, searchQuery, theme } = useStore();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsTracker`;
        // eslint-disable-next-line
    }, [category]);

    const fetchNews = async (isLoadMore = false) => {
        if (!isLoadMore) {
            setProgress(10);
            setLoading(true);
            setArticles([]);
            setError(null);
        }

        let apiCategory = category === 'general' ? 'top' : category;
        let url = `https://newsdata.io/api/1/latest?apikey=pub_0695aae480184832a8d446a1f2e4bd6b&country=${country}&category=${apiCategory}&language=en`;
        
        if (searchQuery) {
            url += `&q=${encodeURIComponent(searchQuery)}`;
        }

        if (isLoadMore && nextPageToken) {
            url += `&page=${nextPageToken}`;
        }

        try {
            let data = await fetch(url);
            let parsedData = await data.json();

            if (parsedData.status === 'success') {
                setArticles(prev => isLoadMore ? [...prev, ...(parsedData.results || [])] : (parsedData.results || []));
                setNextPageToken(parsedData.nextPage || null);
            } else {
                // API returned an error (e.g., rate limit)
                setError(parsedData.results?.message || parsedData.message || "Daily API request limit reached. Please try again tomorrow.");
            }
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Network Error: Could not connect to the news server.");
        } finally {
            if (!isLoadMore) {
                setLoading(false);
                setProgress(100);
            }
        }
    };

    useEffect(() => {
        fetchNews();
        // eslint-disable-next-line
    }, [category, country, searchQuery]);

    const fetchMoreData = () => {
        if (nextPageToken) {
            fetchNews(true);
        }
    };

    // Skeleton loader component
    const SkeletonCard = () => (
        <div className="card h-100 glass-panel" style={{ border: 'none', borderRadius: '15px', overflow: 'hidden' }}>
            <Skeleton height={200} baseColor={theme === 'dark' ? '#202025' : '#e0e0e0'} highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'} />
            <div className="card-body d-flex flex-column">
                <Skeleton count={2} className="mb-3" baseColor={theme === 'dark' ? '#202025' : '#e0e0e0'} highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'} />
                <Skeleton count={3} baseColor={theme === 'dark' ? '#202025' : '#e0e0e0'} highlightColor={theme === 'dark' ? '#333' : '#f5f5f5'} />
            </div>
        </div>
    );

    return (
        <>
            <div className='container' style={{ paddingTop: '90px', paddingBottom: '50px' }}>
                <h1 className='page-title'>
                    {searchQuery ? `Search Results for "${searchQuery}"` : `Top Headlines - `}
                    {!searchQuery && <span>{capitalizeFirstLetter(category)}</span>}
                </h1>
                
                {loading ? (
                    <div className="my-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className="d-flex flex-column align-items-center justify-content-center text-center my-5 py-5 glass-panel" style={{ borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                        <AlertCircle size={64} style={{ color: 'var(--accent-color)', marginBottom: '20px' }} />
                        <h2 style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Oops! Something went wrong.</h2>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', fontSize: '1.1rem' }}>
                            {error}
                        </p>
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={!!nextPageToken}
                        loader={
                            <div className="d-flex justify-content-center my-4">
                                <div className="modern-spinner"></div>
                            </div>
                        }
                        style={{ overflow: 'visible' }}
                    >
                        <div className="my-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {articles.map((element, index) => {
                                return (
                                    <div className="animate-fade-in-up" style={{ animationDelay: `${(index % 10) * 0.1}s` }} key={element.article_id || index}>
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
                                )
                            })}
                        </div>
                    </InfiniteScroll>
                )}
            </div>
        </>
    );
};

News.defaultProps = {
    pagesize: 6,
    category: 'general'
};

News.propTypes = {
    pagesize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired
};

export default News;
