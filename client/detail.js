//Get data from local storage, if no data is found assign an empty array
const starships = JSON.parse(localStorage.getItem("starships")) || [];

//Get the name parameter from the query string of the URL of the current page.
const starshipName = new URLSearchParams(window.location.search).get("name");

//Search the starships array for a starship with a name property that matches the starshipName variable.
const starship = starships.find((starship) => starship.name === starshipName);

//Take a starship object and render its details in an HTML table.
const renderStarshipDetails = (starship) => {
  const starshipDetailsTableBody = document.getElementById(
    "starshipDetailsTableBody"
  );
  starshipDetailsTableBody.innerHTML = "";

  Object.entries(starship).forEach(([key, value]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th>${key}</th>
      <td>${value}</td>
    `;
    starshipDetailsTableBody.appendChild(row);
  });
};

//Check if a starship was found with the specified name. If found, call the function to render the starship details. If not found, show alert.
if (starship) {
  renderStarshipDetails(starship);
} else {
  alert("Starship not found!");
}
