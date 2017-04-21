import React from 'react';

import { removeItem } from '../TodoAPI';

export class TodoFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: this.props.todos || [],
            completed: [],
            left: []
        };
    }

    componentWillMount() {
        let completed = [], left = [];
        this.state.todos.forEach((el) => {
            if (el.done) {
                completed.push(el);
            } else {
                left.push(el);
            }
        });

        this.setState({ completed: completed, left: left });
    }

    componentWillReceiveProps(nextProps) {
        let completed = [], left = [];
        nextProps.todos.forEach((el) => {
            if (el.done) {
                completed.push(el);
            } else {
                left.push(el);
            }
        });

        this.setState({ completed: completed, left: left });
    }

    _onClick() {
        this.state.completed.forEach((el) => {
            removeItem(el.id).end((error, response) => {
                if (error)
                    console.error(error);
                
                if (response.statusCode === 200) {
                    this.props.removeTodo(el.id);
                }
            });            
        });
    }

    render() {
        let showClear = null;

        if (this.state.completed.length > 0) {
            showClear = <a id="clear-completed" onClick={this._onClick.bind(this)}>Clear {this.state.completed.length} completed item</a>;
        }

        return (
            <footer>
                {showClear}
                <div className="todo-count"><b>{this.state.left.length}</b> items left</div>
            </footer>
        )
    }
}

export default TodoFooter;