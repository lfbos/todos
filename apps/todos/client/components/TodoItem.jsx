import React from 'react';

import { completeItem, removeItem, updateItem } from '../TodoAPI';

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            done: this.props.done,
            edit: false
        };
    }

    // update state on changes
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            done: nextProps.done,
            edit: false
        });
    }

    _onKeyUp(event) {
        if (+event.keyCode == 13) {
            updateItem(this.props.id, { title: this.state.title })
                .end((error, response) => {
                    if (error) {
                        console.error(error);
                    }

                    if (response.statusCode == 200) {
                        this.setState({ edit: !this.state.edit, title: response.body.title, done: response.body.done });
                    }
                });
        }
    }

    render() {
        let classes = `${this.state.done ? 'done' : ''} ${this.state.edit ? 'editing' : ''}`;
        return (
            <li className={classes}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={this.state.done}
                        onChange={() => {
                            this.setState({ done: !this.state.done });
                            completeItem(this.props.id, `${!this.state.done}`).end((error, response) => {
                                if (error)
                                    console.error(error);
                                if (response.statusCode === 200) {
                                    this.props.updateTodo(response.body);
                                }
                            });
                        }} />
                    <label onDoubleClick={() => {
                        this.setState({ edit: !this.state.edit });
                    }}>{this.state.title}</label>
                    <a className="destroy" onClick={() => {
                        removeItem(this.props.id).end((error, response) => {
                            if (error)
                                console.error(error);
                            if (response.statusCode === 200) {
                                this.props.removeTodo(this.props.id);
                            }
                        });
                    }}></a>
                </div>
                <input className="edit" type="text" value={this.state.title}
                    onChange={(e) => {
                        this.setState({ title: e.target.value });
                    }} onKeyUp={this._onKeyUp.bind(this)} />
            </li>
        )
    }
}

export default TodoItem;