// Function to populate task cards
async function populateTaskCard() {
    // Select necessary elements
    const button = document.getElementById("submit-button");

    // Event listener for adding a new task
    button.addEventListener("click", async function (e) {
        e.preventDefault(); // Prevent form submission and page reload

        // Get input values
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;
        const priority = document.getElementById("task-priority").value;

        // Post the new task to the database
        await postCard(title, description, dueDate, priority);

        // Refresh the tasks list
        await refreshTasksList();

        // Re-attach event listener for delete buttons after refreshing the list
        attachDeleteEventListeners();
    });
}

// Function to post a new task to the database
async function postCard(title, description, dueDate, priority) {
    const task = {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate
    };

    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });
}

// Function to refresh the tasks list from the database and render cards
async function refreshTasksList() {
    // Fetch all tasks from the database
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();

    // Clear the current tasks list
    const aside = document.querySelector("aside");
    aside.innerHTML = '';

    // Render each task as a new card
    tasks.forEach(task => {
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = `
            <div class="card-content">
                <div> <strong>Title:</strong> ${task.title} </div>
                <div> <strong>Description:</strong> ${task.description} </div>
                <div> <strong>Due Date:</strong> ${task.dueDate}  </div>
                <div> <strong>Priority Level:</strong> ${task.priority}  </div>
                <div class="delete-button-container">
                    <button class="delete-button" id="${task.id}">Delete</button>
                </div>
            </div>
        `;
        aside.appendChild(newCard);
    });

    // Attach event listeners to delete buttons
    attachDeleteEventListeners();
}


// Function to attach event listeners to delete buttons
function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            const taskId = event.target.id;
            await deleteTask(taskId);
            // Remove the card from the UI immediately
            event.target.closest(".card").remove();
        });
    });
}

// Function to delete a task from the database
async function deleteTask(taskId) {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE"
    });
}


function filterTask() {
    const filterInput = document.getElementById('search-task').value.toLowerCase(); 

    const taskCards = document.querySelectorAll('.card');

    taskCards.forEach(card => {

        const title = card.querySelector('.card-content div:first-child').textContent.toLowerCase(); 

        if (title.includes(filterInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Call the populateTaskCard function to initialize
populateTaskCard();
refreshTasksList();
attachDeleteEventListeners();
filterTask();