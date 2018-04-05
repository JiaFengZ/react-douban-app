import React, { Component } from 'react';
import '../../style.css';

class NavBar extends Component {

	togglePage(e) {
		let target = e.target || e.srcElement;
        if (!target.dataset.page) return;
		this.props.changePage(target.dataset.page);
	}

	constructor(props) {
	    super(props);
	    this.togglePage = this.togglePage.bind(this);
	}
    
    render() {
        const page = this.props.page;
        return (
	        <div className="nav-bar" onClick={this.togglePage}>
                <div className="nav-item" data-page="book" data-active={page=='book'}>
                	<span>图书</span>
                </div>
                <div className="nav-item" data-page="film" data-active={page=='film'}>
                	<span>电影</span>
                </div>
                <div className="nav-item" data-page="music" data-active={page=='music'}>
                	<span>音乐</span>
                </div>
	        </div>
        );
    }
}

module.exports = NavBar;