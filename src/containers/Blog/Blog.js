import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import AsyncComponent from '../hoc/asyncComponent';

const AsyncNewPost = AsyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        userAuth: true
    }
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts'
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true',
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.userAuth && <Route path='/new-post' component={AsyncNewPost} />}
                    <Route path='/posts' component={Posts} />
                    <Route render={() => <h1>Not Found</h1>}/>
             {/* Yuxaridaki route ile redirect biryerde isleye bilmez cunki her ikisi butun yalnisadresleri tutur */}
                    {/* <Redirect from='/' to='/posts' /> */}
                    {/* <Route path='/' component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;