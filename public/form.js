const todo_form = document.getElementById("todoForm");
const search_form = document.getElementById("searchForm");

const name_input = document.getElementById("userInput");
const todo_input = document.getElementById("todoInput");
const search_input = document.getElementById("searchInput");

const todo_paragraph = document.getElementById("todo_paragraph");
const search_paragraph = document.getElementById("search_paragraph");

todo_form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const name = name_input.value;
	const todo = todo_input.value;

	const body = {
		name: name,
		todo: todo,
	};

	if (name && todo) {
		name_input.value = "";
		todo_input.value = "";
	}

	const url = "http://localhost:3000/add";
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	const response = await (await fetch(url, options)).text();

	todo_paragraph.innerText = response;
});

function display_todos(todos) {
	const todo_list = document.getElementById("todo_list");
	todo_list.innerHTML = "";
	for (const todo of todos) {
		const li = document.createElement("li");
		li.innerText = todo;
		todo_list.appendChild(li);
	}
}

search_form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const query = search_input.value;
	if (query) {
		const url = `http://localhost:3000/todos/${query}`;

		const response = await fetch(url);
		const content_type = response.headers.get("Content-Type");
		const body = await response.text();

		if (content_type.startsWith("application/json")) {
			const todos = JSON.parse(body);
			console.log(todos);
			search_paragraph.innerText = "";
			display_todos(todos);
		} else if (content_type.startsWith("text/html")) {
			search_paragraph.innerText = body;
		}
	}
});
