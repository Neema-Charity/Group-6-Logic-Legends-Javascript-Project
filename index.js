function addTask() {
    const button = document.getElementById('submit-button');
    const tableBody = document.querySelector("tbody");
    const reportList = document.getElementById("report-list");
    const searchInput = document.getElementById("search-task-input");

    // Function to create a new row in the table
    function createRow(title, description, dueDate) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${dueDate}</td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="delete-button">Delete</button></td>
        `;
        tableBody.appendChild(newRow);
    }

    // Event listener for adding a new task
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Get input values
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;

        // Create a new row
        createRow(title, description, dueDate);

        // Clear input fields
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("task-due-date").value = "";
    });

    // Event listener for deleting a task
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            event.target.closest("tr").remove();
        }
    });

    // Event listener for editing a task
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const row = event.target.closest("tr");
            const title = row.children[1].textContent;
            const description = row.children[2].textContent;
            const dueDate = row.children[3].textContent;

            // Populate input fields with task details for editing
            document.getElementById("task-title").value = title;
            document.getElementById("task-description").value = description;
            document.getElementById("task-due-date").value = dueDate;

            // Remove the edited row
            row.remove();
        }
    });

    // Function to generate report
    function generateReport() {
        reportList.innerHTML = "";

        tableBody.querySelectorAll("tr").forEach((row, index) => {
            const taskId = index + 1;
            const taskTitle = row.children[1].textContent;
            const taskDescription = row.children[2].textContent;
            const taskDueDate = row.children[3].textContent;

            const listItem = document.createElement("li");
            listItem.textContent = `Task ${taskId}: ${taskTitle} - Description: ${taskDescription} - Due Date: ${taskDueDate}`;
            reportList.appendChild(listItem);
        });
    }

    // Event listener for generating report
    const generateReportButton = document.getElementById("generate-report-button");
    generateReportButton.addEventListener("click", generateReport);

    // Function to search for tasks
    function searchTasks() {
        const searchValue = searchInput.value.toLowerCase();

        tableBody.querySelectorAll("tr").forEach(row => {
            const title = row.children[1].textContent.toLowerCase();
            const description = row.children[2].textContent.toLowerCase();
            const dueDate = row.children[3].textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue) || dueDate.includes(searchValue)) {
                row.style.display = ""; // Show the row if it matches the search query
            } else {
                row.style.display = "none"; // Hide the row if it does not match the search query
            }
        });
    }

    // Event listener for search input
    searchInput.addEventListener("input", searchTasks);
}

// Call the addTask function to initialize
addTask();
