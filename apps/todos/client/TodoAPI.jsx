import request from 'superagent';

export const getItems = () => {
    return request.get(`/todos`);
}

export const createItem = (data) => {
    return request.post('/todos').send(data);
}

export const updateItem = (id, data) => {
    return request.put(`/todos/${id}`).send(data);
}

export const completeItem = (id, checked) => {    
    return request.put(`/todos/${id}`).send({ done: checked });
}

export const removeItem = (id) => {
    return request.delete(`/todos/${id}`);
}
