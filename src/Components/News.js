import React, { Component } from 'react'
import NewsComponent from './NewsComponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'us', 
        pagesize: 5,  
        category: 'general' 
    }
    
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
   
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props); 
        
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            nextPageToken: null
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTracker`;
    }

    async updateNews(pageToken = null) {
        const { setProgress } = this.props;
        setProgress(10);

        let apiCategory = this.props.category === 'general' ? 'top' : this.props.category;
        let url = `https://newsdata.io/api/1/latest?apikey=pub_0695aae480184832a8d446a1f2e4bd6b&country=${this.props.country}&category=${apiCategory}&language=en`;
        
        if (pageToken) {
            url += `&page=${pageToken}`;
        }

        this.setState({ loading: true });

        try {
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            this.setState({
                articles: parsedData.results || [], 
                totalResults: parsedData.totalResults || 0,
                nextPageToken: parsedData.nextPage || null,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }

        setProgress(100);
    }
    
    async componentDidMount() {
        this.updateNews();
    }

    handlenext = async () => {
        if (this.state.nextPageToken) {
            this.setState({ page: this.state.page + 1 });
            this.updateNews(this.state.nextPageToken);
            window.scrollTo(0, 0);
        }
    }
    
    handleprevious = async () => {
        // NewsData.io doesn't easily support backward pagination with tokens
        // So we will just go back to the first page for simplicity
        this.setState({ page: 1 });
        this.updateNews();
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <>
            <div className='container' style={{ paddingTop: '90px' }}>
                <h1 className='page-title'>Top Headlines - <span>{this.capitalizeFirstLetter(this.props.category)}</span></h1>
                {this.state.loading && <Spinner />}
                <div className="my-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {this.state.articles.map((element, index) => {
                        return (
                            <div className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }} key={element.article_id || index}>
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
            </div>
            <div className="container d-flex justify-content-between mb-5">
                <button 
                    type="button" 
                    disabled={this.state.page <= 1} 
                    className="btn btn-modern" 
                    onClick={this.handleprevious}
                >
                    &larr; Previous
                </button>
                <button 
                    type="button" 
                    disabled={!this.state.nextPageToken} 
                    className="btn btn-modern" 
                    onClick={this.handlenext}
                >
                    Next &rarr;
                </button>
            </div>
            </>
        )
    }
}

export default News;
