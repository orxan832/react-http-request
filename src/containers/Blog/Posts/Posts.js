import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';


class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    selectedPostHandler = (id) => {
        this.setState({ selectedPostId: id });
        // this.props.history.push({pathname: '/' + id});
        this.props.history.push('/posts/' + id);
    }

    componentDidMount() {
        axios('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({ posts: updatePosts });
            });
    }

    render() {
        let posts = this.state.posts.length === 0 ? <Spinner /> :
            this.state.posts.map(post => {
                return <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.selectedPostHandler(post.id)} />
            });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;
