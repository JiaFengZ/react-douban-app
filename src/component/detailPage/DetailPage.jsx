import React, { Component } from 'react';
import '../../style.css';
import BookDetail from './BookDetail';
import FilmDetail from './FilmDetail';
import MusicDetail from './MusicDetail';

class DetailPage extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
        if (!this.props.detailShow) {
          return <div></div>
        } else {
            const page = this.props.page;
            const seeDetail = this.props.seeDetail;
            const detailInfo = this.props.detailInfo;
            const Detail = (function(page) {
                switch (page) {
                    case 'book':
                        return <BookDetail seeDetail={seeDetail} detailInfo={detailInfo}/>;
                    case 'film':
                        return <FilmDetail seeDetail={seeDetail} detailInfo={detailInfo}/>;
                    case 'music':
                        return <MusicDetail seeDetail={seeDetail} detailInfo={detailInfo}/>;
                }
            })(page);
            return (
                <div className="detail-container">{Detail}</div>
            );
        }
    }        
}

module.exports = DetailPage;


