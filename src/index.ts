import { Router, Request, Response, response } from "express";

const router = Router();

type TUser = {
	name: string;
	todos: string[];
};

const users: TUser[] = [];

type TAddRequest = {
	name: string;
	todo: string;
};

function find_user(name: string): TUser {
	for (const user of users) {
		if (user.name === name) {
			return user;
		}
	}
	const new_user: TUser = {
		name: name,
		todos: [],
	};
	users.push(new_user);
	return new_user;
}

router.post("/add", (request: Request, response: Response) => {
	const request_body: TAddRequest = request.body;
	if (request_body.name && request_body.todo) {
		const user: TUser = find_user(request_body.name);
		user.todos.push(request_body.todo);
		console.log(users);
		response.send(`Todo added successfully for user ${request_body.name}.`);
	} else {
		response.send(`Todo or user name cannot be empty!`);
	}
});

router.get("/todos/:id", (request: Request, response: Response) => {
	const name = request.params.id;
	let todos: string[] | undefined = undefined;
	for (const user of users) {
		if (name === user.name) {
			todos = user.todos;
		}
	}

	if (todos !== undefined) {
		response.send(todos);
	} else {
		response.send("User not found");
	}
});

export default router;
