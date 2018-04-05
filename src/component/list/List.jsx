import React, { Component, PropTypes} from 'react';
import '../../style.css';
import MusicList from './MusicList';
import FilmList from './FilmList';
import BookList from './BookList';

import $ from 'jquery';
import ReactPullLoad, { STATS } from 'react-pullload';
import '../../ReactPullLoad.css';


class List extends Component {
	constructor(props) {
	    super(props);	
        this.state ={
            hasMore: true,
            action: STATS.init,
            index: 3000
        }
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handLoadMore = this.handLoadMore.bind(this);
        this.handRefreshing = this.handRefreshing.bind(this);
	}

    handRefreshing() {
        if (STATS.refreshing === this.state.action) {
            return false;
        }
        const that = this;
        this.props.refresh(function() {
            console.log('refreshcallback');
            setTimeout(() => that.setState({
                hasMore: true,
                action: STATS.refreshed,
                index: 3000
            }), 500);
          
        });
        this.setState({
            action: STATS.refreshing
        });
    }


    handLoadMore() {
        if (STATS.loading === this.state.action) {
            return false
        }
        if (!this.state.hasMore) {
            return;
        }
        const that = this;
        this.props.loadMore(function() {
            console.log('loadMorecallback');
            setTimeout(function() {
                if (that.state.index === 0) {
                    that.setState({
                      hasMore: false
                    });
                } else{
                    that.setState({
                      action: STATS.reset,
                      index: that.state.index - 1
                    });
                }
            }, 500);
        
        });
        this.setState({
            action: STATS.loading
        })
    }

    handleRefresh(action) {
        console.log('emit');
        if (action === this.state.action) {
            return false
        }

        if (action === STATS.refreshing) {//刷新
            this.handRefreshing();
        } else if (action === STATS.loading) {//加载更多
            this.handLoadMore();
        } else{
            this.setState({
                action: action
            });
        }
    }

    componentDidMount() {
        const that = this;
        $('.list-container').scroll(function() {
            const scrollTop = this.scrollTop;
            const scrollHeight = this.scrollHeight;
            const windowHeight = this.clientHeight;
 
        　　if (scrollTop + windowHeight == scrollHeight) {
        　　　　that.handLoadMore();
        　　} else if (scrollTop == 0) {
                that.handRefreshing();
            }
        });
    }


    render() {
        const page = this.props.page;
        const seeDetail = this.props.seeDetail;
        const listItems = this.props.listItems;
        const handleRefresh = this.handleRefresh;

        const hasMore = this.state.hasMore;

        const List = (function(page) {
	    		switch (page) {
		        	case 'book':
		        		return <BookList seeDetail={seeDetail} listItems={listItems}/>;
		        	case 'film':
		        		return <FilmList seeDetail={seeDetail} listItems={listItems}/>;
		        	case 'music':
		        		return <MusicList seeDetail={seeDetail}  listItems={listItems}/>;
		        }
		    })(page);
        return (
	        <ReactPullLoad className="list-container" downEnough={150}
                action={this.state.action}
                handleAction={this.handleRefresh}
                hasMore={hasMore}
                distanceBottom={100}
                isBlockContainer={true}>{List}</ReactPullLoad>
        );
    }
}

module.exports = List;


