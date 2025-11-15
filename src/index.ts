import { Router, Request, Response, response } from "express";

const router = Router();

type TUser = {
	name: string;
	todos: string[];
};

let users: TUser[] = [];

type TAddRequest = {
	name: string;
	todo: string;
};

function find_user(name: string): TUser | null {
	for (const user of users) {
		if (user.name === name) {
			return user;
		}
	}
	return null;
}

router.post("/add", (request: Request, response: Response) => {
	const request_body: TAddRequest = request.body;
	if (request_body.name && request_body.todo) {
		let user: TUser | null = find_user(request_body.name);
		if (!user) {
			user = {
				name: request_body.name,
				todos: [],
			};
			users.push(user);
		}
		user.todos.push(request_body.todo);
		console.log(users);
		response.send(`Todo added successfully for user ${request_body.name}.`);
	} else {
		response.send(`Todo or user name cannot be empty!`);
	}
});

router.get("/todos/:id", (request: Request, response: Response) => {
	const name = request.params.id;
	let user: TUser | null = find_user(name);
	if (user) {
		response.send(user.todos);
	} else {
		response.send("User not found");
	}
});

router.delete("/delete", (request: Request, response: Response) => {
	const name: string = request.body;
	console.log(name);
	const found_user: TUser | null = find_user(name);
	if (found_user) {
		users = users.filter((user: TUser) => {
			return user.name !== found_user.name;
		});
		console.log(users);
		response.statusCode = 200;
		response.send("User deleted successfully");
	} else {
		response.statusCode = 404;
		response.send("User not found");
	}
});

export default router;
