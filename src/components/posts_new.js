import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostNew extends Component {

    
    renderField(field) {
        const { meta : { touched, error } } = field;
        const divClass = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={divClass}>
                <label className="form-label">{field.label}</label>
                <input
                    autoComplete="off"
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">{touched ? error : ''}</div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    component={this.renderField}
                    name="title"
                    label="Title for Post"
                />
                <Field 
                    component={this.renderField}
                    name="categories"
                    label="Categories"
                />
                <Field 
                    component={this.renderField}
                    name="content"
                    label="Post Content"
                />
                    <button className="btn btn-primary" type="submit">Submit</button>
                    <Link className="btn btn-danger" style={{marginLeft: 10+ 'px'}} to="/">Cancel</Link>
            </form>
        ); 
    }
}

const validate = (values) => {
    const errors = {};

    if(!values.title) {
        errors.title = "Enter a Title!";
    }
    if(!values.categories) {
        errors.categories = "Enter some categories!";
    }
    if(!values.content) {
        errors.content = "Enter some content!";
    }

    return errors;
}

export default reduxForm({
    form: 'postNewForm',
    validate,
})(connect(null,{ createPost })(PostNew));