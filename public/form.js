const todo_form = document.getElementById("todoForm");
const name_input = document.getElementById("userInput");
const todo_input = document.getElementById("todoInput");
const response_paragraph = document.getElementById("response_paragraph");

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

	response_paragraph.innerText = response;
});
