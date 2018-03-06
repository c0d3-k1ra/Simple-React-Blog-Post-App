import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSinglePost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { post } = this.props;
        if(post) {
            return (
                <div style={{marginTop: 10 + 'px'}}>
                    <Link className="btn btn-primary" to="/">Back to Index</Link>
                    <button
                        className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}
                    >
                    Delete Post
                    </button>
                    <hr />
                    <div style={{marginTop: 15 + 'px'}}>
                        <h3>{post.title}</h3>
                        <hr />
                        <h6>Categories: {post.categories}</h6>
                        <hr />
                        <p>{post.content}</p>      
                    </div>
                </div>
            );
        }
        return (
            <div>
                Loading...
            </div>
        );
    }
};

const mapStateToProps = ({ posts }, ownProps) => {
    return { post: posts[ownProps.match.params.id] };
}


export default connect(mapStateToProps,{ fetchSinglePost, deletePost })(PostShow);