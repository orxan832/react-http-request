import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from '../../axios';

class Blog extends Component {

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
            clicked={() => this.selectedPostHandler(post.id)}/>
        })

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;