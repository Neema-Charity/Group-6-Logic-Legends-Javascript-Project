function addTask() {
    const button = document.getElementById('submit-button');
    const tableBody = document.querySelector("tbody");
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // The input fields
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;

        // Creation of a new row
        const newRow = document.createElement("tr");

        // Populating the table values 
        newRow.innerHTML = `
        <td>${tableBody.children.length + 1}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${dueDate}</td>
        <td><button class="delete-button">Delete</button></td>
        `;

        tableBody.appendChild(newRow);

        // Clearing the input fields
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("task-due-date").value = "";

    });
    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            event.target.closest("tr").remove();
        }
    });
}
addTask()