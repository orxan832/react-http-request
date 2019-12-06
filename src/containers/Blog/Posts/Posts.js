import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';


class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    selectedPostHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    componentDidMount() {
        axios('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatePosts});
            });
    }

    render() {
        const posts = this.state.posts.map(post => {
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
            </div>
        )
    }
}

export default Posts;
