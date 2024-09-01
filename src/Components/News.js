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
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTracker`;
    }

    async updateNews() {
        const { setProgress } = this.props;
        setProgress(10);

        let url = `http://api.mediastack.com/v1/news?access_key=7b8511c15be4e2a900636195aee3fb37&countries=${this.props.country}&categories=${this.props.category}&limit=${this.props.pagesize}&offset=${(this.state.page - 1) * this.props.pagesize}`;
        
        this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles: parsedData.data || [], 
            totalResults: parsedData.pagination.total, 
            loading: false
        });

        setProgress(100);
    }
    
    async componentDidMount() {
        this.updateNews();
    }

    handlenext = async () => {
        this.setState(
            { page: this.state.page + 1 },
            () => {
                this.updateNews();
                window.scrollTo(0, 0);
            }
        );
    }
    
handleprevious = async () => {
    this.setState(
        { page: this.state.page - 1 },
        () => {
            this.updateNews();
            window.scrollTo(0, 0);
        }
    );
}

    render() {
        return (
            <>
            <div className='container'>
                <h1 className='text-center my-2'>Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-2">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsComponent 
                                    title={element.title ? element.title.slice(0, 40) : ""} 
                                    description={element.description ? element.description.slice(0, 50) : ""} 
                                    imageUrl={element.image }  
                                    newsUrl={element.url}
                                    author={element.author} 
                                    date={element.published_at}  
                                    source={element.source}  
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="container d-flex justify-content-between">
                <button 
                    type="button" 
                    disabled={this.state.page <= 1} 
                    className="btn btn-dark" 
                    onClick={this.handleprevious}
                >
                    &larr; Previous
                </button>
                <button 
                    type="button" 
                    disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} 
                    className="btn btn-dark" 
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
