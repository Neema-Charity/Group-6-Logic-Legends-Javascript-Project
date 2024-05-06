
// // Function to populate task cards
// async function populateTaskCard() {
//     // Select necessary elements
//     const button = document.getElementById("submit-button");

//     // Event listener for adding a new task
//     button.addEventListener("click", async function (e) {
//         e.preventDefault(); // Prevent form submission and page reload

//         // Get input values
//         const title = document.getElementById("task-title").value;
//         const description = document.getElementById("task-description").value;
//         const dueDate = document.getElementById("task-due-date").value;
//         const priority = document.getElementById("task-priority").value;

//         // Post the new task to the database
//         await postCard(title, description, dueDate, priority);

//         // Refresh the tasks list
//         await refreshTasksList();

//         // Re-attach event listener for delete buttons after refreshing the list
//         attachDeleteEventListeners();
//     });
// }

// // Function to post a new task to the database
// async function postCard(title, description, dueDate, priority) {
//     const task = {
//         title: title,
//         description: description,
//         priority: priority,
//         dueDate: dueDate
//     };

//     await fetch("http://localhost:3000/tasks", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(task)
//     });
// }

// // Function to refresh the tasks list from the database and render cards
// async function refreshTasksList() {
//     // Fetch all tasks from the database
//     const response = await fetch("http://localhost:3000/tasks");
//     const tasks = await response.json();

//     // Clear the current tasks list
//     const aside = document.querySelector("aside");
//     aside.innerHTML = '';

//     // Render each task as a new card
//     tasks.forEach(task => {
//         const newCard = document.createElement("div");
//         newCard.className = "card";
//         newCard.innerHTML = `
//             <div class="card-content">
//                 <div> <strong>Title:</strong> ${task.title} </div>
//                 <div> <strong>Description:</strong> ${task.description} </div>
//                 <div> <strong>Due Date:</strong> ${task.dueDate}  </div>
//                 <div> <strong>Priority Level:</strong> ${task.priority}  </div>
//                 <div class="delete-button-container">
//                     <button class="delete-button" id="${task.id}">Delete</button>
//                 </div>
//             </div>
//         `;
//         aside.appendChild(newCard);
//     });

//     // Attach event listeners to delete buttons
//     attachDeleteEventListeners();
// }


// // Function to attach event listeners to delete buttons
// function attachDeleteEventListeners() {
//     const deleteButtons = document.querySelectorAll(".delete-button");
//     deleteButtons.forEach(button => {
//         button.addEventListener("click", async function (event) {
//             event.preventDefault();
//             const taskId = event.target.id;
//             await deleteTask(taskId);
//             // Remove the card from the UI immediately
//             event.target.closest(".card").remove();
//         });
//     });
// }

// // Function to delete a task from the database
// async function deleteTask(taskId) {
//     await fetch(`http://localhost:3000/tasks/${taskId}`, {
//         method: "DELETE"
//     });
// }

// // Call the populateTaskCard function to initialize
// populateTaskCard();
// refreshTasksList(); 
// attachDeleteEventListeners();


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
        attachEditEventListeners();
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
        const newCard = createTaskCard(task);
        aside.appendChild(newCard);
    });

    // Attach event listeners to delete and edit buttons
    attachDeleteEventListeners();
    attachEditEventListeners();
}

// Function to create a task card
function createTaskCard(task) {
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `
        <div class="card-content">
            <div> <strong>Title:</strong> ${task.title} </div>
            <div> <strong>Description:</strong> ${task.description} </div>
            <div> <strong>Due Date:</strong> ${task.dueDate}  </div>
            <div> <strong>Priority Level:</strong> ${task.priority}  </div>
            <div class="button-container">
                <button class="edit-button" id="${task.id}">Edit</button>
                <button class="delete-button" id="${task.id}">Delete</button>
            </div>
        </div>
    `;
    return newCard;
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

// Function to attach event listeners to edit buttons
function attachEditEventListeners() {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach(button => {
        button.addEventListener("click", async function (event) {
            event.preventDefault();
            const taskId = event.target.id;
            // Call edit task function with taskId
            editTask(taskId);
        });
    });
}

// Function to edit a task
async function editTask(taskId) {
    // Fetch the task data for editing
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
    const task = await response.json();

    // Show an edit form to update task details
    const title = prompt("Enter new title:", task.title);
    const description = prompt("Enter new description:", task.description);
    const dueDate = prompt("Enter new due date:", task.dueDate);
    const priority = prompt("Enter new priority level:", task.priority);

    // Update task data
    const updatedTask = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    // Send updated task data to the server
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask)
    });

    // Refresh the tasks list
    await refreshTasksList();
}

// Function to delete a task from the database
async function deleteTask(taskId) {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE"
    });
}

// Function to search for tasks
function searchTasks(event) {
    const query = event.target.value.toLowerCase();
    const tasks = document.querySelectorAll(".card");
    tasks.forEach(task => {
        const title = task.querySelector(".card-content").textContent.toLowerCase();
        if (title.includes(query)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// Function to attach event listener for search input
function attachSearchEventListener() {
    const searchInput = document.getElementById("search-task");
    searchInput.addEventListener("input", searchTasks);
}

// Function to generate a report of all tasks
async function generateReport() {
    // Fetch all tasks from the server
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();

    // Format tasks into a report (e.g., CSV or PDF)
    const reportData = tasks.map(task => {
        return {
            Title: task.title,
            Description: task.description,
            DueDate: task.dueDate,
            Priority: task.priority
        };
    });

    // Convert report data to CSV format
    const csvData = convertToCSV(reportData);

    // Create a blob with the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to download the CSV file
    const a = document.createElement("a");
    a.href = url;
    a.download = "task_report.csv";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Convert data to CSV format
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(","));
    return [header, ...rows].join("\n");
}

// Call the populateTaskCard function to initialize
populateTaskCard();
refreshTasksList();

// Attach event listener for search input
attachSearchEventListener();

// Attach event listener for the Generate Report button
const generateReportButton = document.getElementById("generate-report-button");
generateReportButton.addEventListener("click", generateReport);


