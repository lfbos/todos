import React from 'react';

import CompleteAllTodos from './CompleteAllTodos';
import TodoFooter from './TodoFooter';
import NewTodoForm from './NewTodoForm';
import TodoItem from './TodoItem';
import { getItems } from '../TodoAPI';

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentWillMount() {
        getItems().end((error, response) => {
                if (response.statusCode === 200) {
                    this.setState({ todos: response.body || [] });
                }
            });
    }

    addNewItem(todo) {
        this.state.todos.unshift(todo);
        this.setState({ todos: this.state.todos });
    }

    updateTodo(item) {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === item.id) {
                    todo.done = item.done;
                    todo.title = item.title;
                }
                return todo;
            })
        });
    }

    removeTodo(id) {
        let todos = this.state.todos.filter((todo) => {
            return todo.id !== id;
        });
        this.setState({ todos });
    }

    render() {
        let selectAll = null;
        let footer = null;

        if (this.state.todos.length > 0) {
            selectAll = <CompleteAllTodos todos={this.state.todos} updateTodo={this.updateTodo.bind(this)} />;
            footer = <TodoFooter todos={this.state.todos} removeTodo={this.removeTodo.bind(this)} />;
        }

        const renderTodos = () => {
            return this.state.todos.map((todo) => {
                return <TodoItem key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    done={todo.done}
                    updateTodo={this.updateTodo.bind(this)}
                    removeTodo={this.removeTodo.bind(this)} />
            });
        }


        return (
            <div className="wrapper">
                <header>
                    <h1>Todos</h1>
                    <NewTodoForm addNewItem={this.addNewItem.bind(this)} />
                    <div id="main">
                        {selectAll}
                        <ul id="todo-list">
                            {renderTodos()}
                        </ul>
                    </div>
                    {footer}
                </header>
            </div>
        )
    }
}

export default TodoApp;