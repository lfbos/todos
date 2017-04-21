import React from 'react';

import { createItem } from '../TodoAPI';

export class NewTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    _onSubmit(e) {
        e.preventDefault();

        if (this.state.value !== '') {
            createItem({ title: this.state.value, done: false })
                .end((error, response) => {
                    if (error)
                        console.error(error);

                    if (response.statusCode === 200) {
                        this.setState({ value: '' });
                        this.props.addNewItem(response.body);
                    }
                });
        }
    }

    render() {
        return (
            <form onSubmit={this._onSubmit.bind(this)}>
                <input id="new-todo"
                    type="text"
                    placeholder="What needs to be done?"
                    value={this.state.value}
                    onChange={(e) => {
                        this.setState({ value: e.target.value });
                    }} />

            </form>
        )
    }
}

export default NewTodoForm;