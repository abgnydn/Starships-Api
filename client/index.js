// Set the API endpoint URL
const apiUrl = "http://localhost:3000";

// Get the HTML table element for starships
const starshipsTable = document.getElementById("starships");
// Get the input field element for filtering by name
const nameFilterInput = document.getElementById("nameFilter");

// Add an event listener for input changes on the name filter input field
nameFilterInput.addEventListener("input", async () => {
  const starships = await getStarships(
    sortKeySelect.value,
    sortOrderSelect.value,
    nameFilterInput.value
  );
});

// Get the select element for sorting order
const sortOrderSelect = document.getElementById("sortOrder");

// Add an event listener for changes in sorting order
sortOrderSelect.addEventListener("change", async () => {
  // When the sorting order changes, get the starships data with the current filter and sorting options
  const starships = await getStarships(
    sortKeySelect.value,
    sortOrderSelect.value,
    nameFilterInput.value
  );
  // Render the updated starships table
  renderStarships(starships);
});
// Get the select element for sorting key
const sortKeySelect = document.getElementById("sortKey");
// Add an event listener for changes in sorting key
sortKeySelect.addEventListener("change", async () => {
  const starships = await getStarships(
    sortKeySelect.value,
    sortOrderSelect.value,
    nameFilterInput.value
  );
  // Render the updated starships table
  renderStarships(starships);
});

// Define a function to fetch starships data from the API with the specified sorting and filtering options
const getStarships = async (sort_key = "", order = "asc", name = "") => {
  // Fetch starships data with the specified sorting and filtering options
  const response = await fetch(
    `${apiUrl}/starships?sort_by=${sort_key}&order=${order}`
  );
  // If the response is not OK (e.g. 404 error), throw an error
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Parse the response as JSON
  const starships = await response.json();
  // Filter the starships data by name using the current filter input value
  const filteredStarships = starships.filter((starship) =>
    starship.name.toLowerCase().includes(name.toLowerCase())
  );
  // Render the filtered starships data in the HTML table
  renderStarships(filteredStarships);
  // Return the filtered starships data
  return filteredStarships;
};

const selectSortKey = document.querySelector("#sortKey");

// Call this function after receiving the response from the API
const renderSortOptions = (starships) => {
  console.log("first");
  // Get an array of all the keys in the first starship object
  const keys = Object.keys(starships[0]);
  selectSortKey.innerHTML = "";
  // Filter the keys to exclude any that are not sortable
  const sortableKeys = keys.filter((key) => {
    return key !== "films" && key !== "pilots" && key !== "url";
  });

  // Create an option element for each sortable key
  sortableKeys.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    selectSortKey.appendChild(option);
  });
};
// Define a function to format a date as a string
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Define a function to render starships data in the HTML table
const renderStarships = (starships) => {
  // Get the HTML table body element for starships
  const starshipsTableBody = document.getElementById("starshipsTableBody");
  const starshipsTableHead = document.getElementById("starshipsTableHead");

  // Clear the table body contents
  starshipsTableBody.innerHTML = "";
  starshipsTableHead.innerHTML = "";
  // Loop through each starship and format any date strings
  starships.forEach((starship) => {
    starship.created = formatDate(starship.created);
    starship.edited = formatDate(starship.edited);
    // Add more properties here as needed
  });

  // Get an array of all the keys in the first starship object
  const keys = Object.keys(starships[0]);

  // Create a th element for each key
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    starshipsTableHead.appendChild(th);
  });

  // Loop through each starship and create a new table row for each one
  starships.forEach((starship) => {
    const row = document.createElement("tr");

    // Add a cell for each column in the starship data
    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = starship[key];
      row.appendChild(td);
    });

    // Add an event listener to redirect to the starship detail page when the row is clicked
    row.addEventListener("click", () => {
      window.location.href = `detail.html?name=${starship.name}`;
    });

    // Append the row to the starships table body
    starshipsTableBody.appendChild(row);
  });
};

// Use IIFE to load the starships data when the page is loaded
(async () => {
  try {
    const starships = await getStarships("name", "asc", "");
    localStorage.setItem("starships", JSON.stringify(starships));
    renderStarships(starships);
    renderSortOptions(starships);
  } catch (error) {
    console.error(error);
  }
})();

// In this JavaScript code, an API URL is defined and the HTML elements for the starships table and the name filter input are retrieved using their respective IDs. Event listeners are added to the name filter input and the sort order and sort key select boxes to fetch and render the starships data with the selected filter and sort options.

// The getStarships function takes three parameters: sort_key, order, and name, and returns a Promise that resolves to a JSON object containing the starships data. It uses the fetch API to make a GET request to the API URL with the specified query parameters. If the response is not successful, it throws an error. Otherwise, it filters the starships data by name and returns the filtered data.

// The renderStarships function takes an array of starships data and renders them in the HTML table. It first clears the starships table body and creates a row for each starship with the createElement method. It then populates the row with the relevant data and appends the row to the starships table body. Finally, it adds an event listener to the row to redirect to the starship detail page when the row is clicked.

// The IIFE(Immediately Invoked Function Expression) at the bottom of the code loads the starships data when the page is loaded using the getStarships function with the default filter and sort options. It then logs the starships data to the console, saves it to local storage, and renders it in the HTML table using the renderStarships function.
