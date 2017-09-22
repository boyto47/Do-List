var addContainer = document.getElementById("addContainer"),
    addInput = document.getElementById("addInput"),
    addButton = document.getElementById("addButton"),
    tasksList = document.getElementById("tasksList"),
    compTasksList = document.getElementById("compTasksList");

// Begin createTask

var createTask = function(taskString) {

    // Create Elements
    var listItem = document.createElement("li"),
        checkbox = document.createElement("input"),
        span = document.createElement("span"),
        editInput = document.createElement("input"),
        editButton = document.createElement("button"),
        delButton = document.createElement("button");
    editButton.setAttribute("class", "editButtonIntro");
    delButton.setAttribute("class", "delButtonIntro");


    // Add Attributes and Text to the Elements
    checkbox.type = "checkbox";
    editInput.type = "text";
    editInput.style.display = "none";
    span.textContent = taskString;
    editButton.textContent = "Edit";
    delButton.textContent = "Delete";


    // Add Event Listeners
    checkbox.addEventListener("change", markTask);
    editButton.addEventListener("click", editTask);
    delButton.addEventListener("click", delTask);

    // Append the Elements to the List Item
    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(delButton);

    return listItem;
}

// End createTask

// Begin addTask

var addTask = function() {

    var newTask = addInput.value,
        noInput = (newTask == ""),
        error = document.createElement("p");
    error.id = "error";
    error.textContent = "Error: You forgot to enter a task!";


    if (noInput && !checkError()) {
        /*  If the user didn't enter anything and there isn't currently an error message displayed,
            then display the error message. */
        addContainer.appendChild(error);
    } else if (noInput && checkError()) {
        /*  If the user didn't enter anything and there's already an error message being displayed,
            then do nothing. */
        return;
    } else {

        switch (!noInput && checkError()) {
            case true:
                /*  If the user entered something and there's an error message being displayed,
                    then remove the error message and continue to case false. */
                var error = document.getElementById("error");
                addContainer.removeChild(error);
            case false:
                // Call the createTask function, then append the task to the list.
                var listItem = createTask(newTask);
                tasksList.appendChild(listItem);
                addInput.value = "";
                break;
        };
    };
};

addButton.addEventListener("click", addTask);

// End addTask

// Begin checkError

var checkError = function() {
    /*  Return true if #error is found.
        Return false if it is not found. */
    if (document.getElementById("error")) {
        return true;
    } else {
        return false;
    };
};

// End checkError

// Begin editTask

var editTask = function() {

    var listItem = this.parentNode,
        editInput = listItem.querySelector("input[type=text]"),
        span = listItem.querySelector("span"),
        editButton = listItem.querySelector("button:first-of-type"),
        containsEditClass = listItem.classList.contains("edit");

    if (!containsEditClass) {
        /*  If user clicks on edit button,
            then display the edit input. */
        editInput.style.display = "inline-block";
        editInput.value = span.textContent;
        editInput.select();
        span.style.display = "none";
        editButton.textContent = "Save";

    } else {
        /*  If the user clicks on the save button,
            then replace the previous span text with whatever the user put into the edit input. */
        editInput.style.display = "none";
        editButton.textContent = "Edit";
        span.style.display = "inline";

        if (editInput.value != "") {
            span.textContent = editInput.value;
        } else {};
    };

    listItem.classList.toggle("edit");

};

// End editTask

// Begin delTask

var delTask = function() {
    var listItem = this.parentNode,
        list = listItem.parentNode;

    list.removeChild(listItem);
};

// End delTask

// Begin markTask

var markTask = function() {

    var listItem = this.parentNode,
        currentList = listItem.parentNode,
        editButton = listItem.querySelector["input[type=text]:first-of-type"];

    if (currentList == tasksList) {
        /*  If the list item is currently on the tasks list,
            then append it to the completed tasks list and remove the edit button. */
        compTasksList.appendChild(listItem);
        editButton.style.display = "none";
    } else {
        /*  If the list item is currently on the completed tasks list,
            then append it to the tasks list and display the edit button again. */
        tasksList.appendChild(listItem);
        editButton.style.display = "inline-block";
    };
};

// End markTask