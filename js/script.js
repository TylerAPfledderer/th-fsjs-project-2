/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
	// Log starting list index number of the current page rendered
	const startIndex = page * 9 - 9;
	// Log the last list index number for the current page rendered
	const endIndex = page * 9;
	// Grab the unordered list element that will contain the list of students for the given page
	const studentList = document.querySelector(".student-list");
	// "Reset" the container when the function runs.
	studentList.innerHTML = "";
	// Return a No Results message if the list array is blank, and immediately stop the function
	if (list.length === 0) {
		return (studentList.innerHTML = `<h2 class="no-results">No results</h2>`);
	}
	// Loop through entire list array
	for (let i = 0; i < list.length; i++) {
		// If the current list item in the iteration is within the given starting and ending index
		//  of the passed in page, render the student
		if (i >= startIndex && i < endIndex) {
			const { name, email, registered, picture } = list[i]; // Simplifying the call to the object props
			studentList.insertAdjacentHTML(
				"beforeend",
				`<li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${picture.large}" alt="Profile Picture of ${name.first}">
            <h3>${name.first} ${name.last}</h3>
            <span class="email">${email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${registered.date}</span>
          </div>
        </li>`
			);
		}
	}
};
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list) => {
	// Grab the unordered list to store the pagination links
	const linkList = document.querySelector(".link-list");
	// Reset the list to empty every time the function is called
	linkList.innerHTML = "";
	const pageNums = list.length / 9;
	for (let j = 1; j <= pageNums; j++) {
		linkList.insertAdjacentHTML(
			"beforeend",
			`<li>
        <button type="button" ${j === 1 ? "class='active'" : ""}>${j}</button>
      </li>`
		);
	}
	linkList.addEventListener("click", (event) => {
		// Store the element clicked
		const element = event.target;
		// If the element clicked is a button element.
		if (element.tagName === "BUTTON") {
			// Add the "active" class
			element.classList.add("active");
			// Grab the list of buttons to iterate over
			const listItems = linkList.querySelectorAll("li");
			for (let k = 0; k < listItems.length; k++) {
				const button = listItems[k].querySelector("button");
				// If the button in the given iteration is not the button clicked
				if (button !== element) {
					// Remove the "active" class, if it exists
					button.classList.remove("active");
				}
			}
			// Render the new page of students
			showPage(list, element.textContent);
		}
	});
};
// Call functions
// Call the first page on load
showPage(data, 1);
// Render the page links on load
addPagination(data);
/*
Create the search form and provide filtering
That updates both the student list and pagination
*/
// Inject searchbar into the header section
document.querySelector("header").insertAdjacentHTML(
	"beforeend",
	`<label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`
);
// Assign the search area
const studentSearch = document.querySelector(".student-search");
// Assign the search input
const searchInput = studentSearch.querySelector("input");
//Assign search submit button
const searchButton = studentSearch.querySelector("button");
// On click of the search submit button...
searchButton.addEventListener("click", () => {
	// Store user's search entry
	const searchEntry = searchInput.value;
	// Create new array of students based on entry value
	// Declare new array value
	const newArray = [];
	// loop through existing data list
	for (let l = 0; l < data.length; l++) {
		// Create full name from student
		const fullName = `${data[l].name.first} ${data[l].name.last}`;
		if (fullName.toLowerCase().includes(searchEntry.toLowerCase())) {
			newArray.push(data[l]);
		}
	}
	showPage(newArray, 1);
	addPagination(newArray);
});
