import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
        // this.props.history.replace('/posts');   
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }
        axios.post('/posts', data)
        .then(response => this.props.history.replace('/posts'));
    }

    render () {
        return (
            <div className="NewPost">
                {/* {this.state.submitted && <Redirect to='/posts' />} */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;

//Redirect sehifeni deyisir ona gore de arxaya qayitmaq olmur. eyni zamanda this.props.history.replace() de.
//this.props.history.push ise sehifeni yonlendirir ona gore de arxaya qayitmaq olur.