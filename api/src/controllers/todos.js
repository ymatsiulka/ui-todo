let todos = [
    {
        id: 1,
        name: 'Task 1',
        isCompleted: false
    },
    {
        id: 2,
        name: 'Task 2',
        isCompleted: false
    },
    {
        id: 3,
        name: 'Task 3',
        isCompleted: true
    }];


export const getTodos = (req, res) => {
    res.send(todos);
}

export const getTodo = (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id)
    if (!todo) {
        res.status(404).json({ message: `Not found todo with id = ${id}` });
        return;
    }

    res.send(todo);
}

export const createTodo = (req, res) => {
    const todo = req.body;
    todo.id = todos.length + 1;
    todos.push({ ...todo });
    res.status(201).send(todo);
};


export const deleteTodo = (req, res) => {
    console.log(`user with id ${req.params.id} has been deleted`);
    console.log(todos);
    todos.splice(todos.findIndex(t => t.id == req.params.id), 1)
    res.status(201).send();
};

export const updateTodo = (req, res) => {
    const { id } = req.params;


    const { name, isCompleted } = req.body;
    console.log(req.body);
    const todo = {
        ...todos.find(t => t.id == id),
        name: name,
        isCompleted: isCompleted
    };

    if (!todo) {
        res.status(404).json({ message: `Not found todo with id = ${id}` });
        return;
    }

    todos = todos.map(t => t.id == todo.id ? todo : t);

    console.log(todo);
    res.status(201).send(todo);
};