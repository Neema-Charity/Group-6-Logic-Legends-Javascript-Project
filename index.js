function populateTaskCard() {
    const button = document.getElementById("submit-button");
    const aside = document.querySelector("aside");

    button.addEventListener("click", function () {

        // Get the input field values by their id's
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const dueDate = document.getElementById("task-due-date").value;

        // To Create a new card element
        const newCard = document.createElement("div");
        newCard.classList.add("card");

        // Populate the card element with the input field values
        newCard.innerHTML = `
            <div class="card-content">
                <strong>Title:</strong> <br> ${title}<br>
                <strong>Description:</strong> <br> ${description}<br>
                <strong>Due Date:</strong> <br> ${dueDate} <br>
                <div class="delete-button-container">
                <button class="delete-button">Delete</button>
                </div>
            </div>
        `;

        // Add the new card to the aside section
        aside.appendChild(newCard);

        // Reset the input fields
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("task-due-date").value = "";
    });

    // Event to handle delete button clicks
    aside.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            event.target.closest(".card").remove();
        }
    });
};
populateTaskCard();