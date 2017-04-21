import React from 'react';

import { completeItem } from '../TodoAPI';

export class CompleteAllTodos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: this.props.todos || [],
            checked: false
        };
    }

    componentWillMount() {
        let completed = this.state.todos.filter((el) => {
            return el.done;
        });

        this.setState({ checked: completed.length == this.state.todos.length, todos: this.state.todos });
    }

    componentWillReceiveProps(nextProps) {
        let completed = nextProps.todos.filter((el) => {
            return el.done;
        });

        this.setState({ checked: completed.length == nextProps.todos.length, todos: nextProps.todos });
    }

    render() {
        return (
            <div>
                <input id="toggle-all" type="checkbox" onChange={() => {                    
                    this.setState({ checked: !this.state.checked });
                    this.state.todos.forEach((todo) => {
                        completeItem(todo.id, `${!this.state.checked}`).end((error, response) => {
                            if (error)
                                console.error(error);
                            if (response.statusCode === 200) {
                                this.props.updateTodo(response.body);
                            }
                        });
                    });
                }} checked={this.state.checked} />
                <label htmlFor="toggle-all">Mark all as complete</label>
            </div>
        )
    }
}

export default CompleteAllTodos;