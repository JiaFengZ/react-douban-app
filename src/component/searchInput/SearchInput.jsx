import React, { Component } from 'react';
import '../../style.css';

class SearchBar extends Component {

	constructor(props) {
	    super(props);
	    this.state = {searchInput: ''};
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.searchTimer = null;
	}

    //搜索输入框触发查询
    handleChange(event) {
        this.setState({
            searchInput: event.target.value
        }, () => {
            var that = this;
            if (that.searchTimer) clearTimeout(that.searchTimer);
            that.searchTimer = setTimeout(() => {                
                that.search();
            }, 500);
        });
     
    }

    search() {
        this.props.search(this.state.searchInput);
    }

    render() {
        let placeholder;
        const searchInput = this.props.resetInput ? '' : this.state.searchInput;
        switch (this.props.page) {
            case 'book':
              placeholder = '书名、作者、ISBN';
              break;
            case 'film':
              placeholder = '电影、影人、电视剧';
              break;
            case 'music':
              placeholder = '唱片名、表演者';
              break;
        }
        return (
	        <div className="search-bar">                
                <input type="text" placeholder={placeholder} value={searchInput} onChange={this.handleChange}/>
                <button onClick={this.search}>搜索</button>
	        </div>
        );
    }
}

module.exports = SearchBar;
