# Starships API

The Starships API is a simple Node.js server built using Express, Axios, and CORS. It fetches data from the [Star Wars API (SWAPI)](https://swapi.dev/) and allows users to query and sort Star Wars starships based on various properties.

## Features

- Fetch Star Wars starships data from the SWAPI.
- Sort starships by various properties, including name, model, manufacturer, cost, length, and more.
- Support for both ascending and descending sorting.

## Getting Started

### Prerequisites

- Node.js (>= v14.x.x)
- npm (>= v6.x.x)

### Installation

1. Clone the repository:`git clone https://github.com/abgnydn/test1.git`

1. Change to the project directory:
   cd test1

1. Install the dependencies:
   npm install

### Running the server

To start the server, run:

npm start

The server will be running on `http://localhost:3000`.

## API Usage

### Get Starships

`GET /starships?sort_by=<property>&order=<order>`

Query Parameters:

- `sort_by` (optional): The property to sort the starships by. Available options are:

  - `name`
  - `model`
  - `manufacturer`
  - `cost_in_credits`
  - `length`
  - `max_atmosphering_speed`
  - `crew`
  - `passengers`
  - `cargo_capacity`
  - `consumables`
  - `hyperdrive_rating`
  - `MGLT`
  - `starship_class`
    Default value is `name`.

- `order` (optional): The sorting order. Available options are:
  - `asc` (ascending)
  - `desc` (descending)
    Default value is `asc`.

Example:

GET /starships?sort_by=length&order=desc

This request will return a list of Star Wars starships sorted by length in descending order.

## Testing

To run the test suite, execute:
npm test

## License

This project is open-source and available under the [MIT License](LICENSE).
