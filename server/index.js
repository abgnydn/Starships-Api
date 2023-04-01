const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { convertConsumablesToHours, parseCrew } = require("./utils/helper.util");

const base_url = "https://swapi.dev/api/";
const app = express();

app.use(cors());

app.get("/starships", async (req, res) => {
  const { sort_by = "name", order = "asc" } = req.query;

  const url = `${base_url}starships/`;

  try {
    const { data } = await axios.get(url);
    const starships = data.results;

    starships.sort((a, b) => {
      let a_value = a[sort_by].replace(",", "");
      let b_value = b[sort_by].replace(",", "");

      if (
        sort_by === "length" ||
        (/^\d+(\.\d+)?$/.test(a_value) && /^\d+(\.\d+)?$/.test(b_value))
      ) {
        a_value = parseFloat(a_value);
        b_value = parseFloat(b_value);
      } else if (sort_by === "crew") {
        a_value = parseCrew(a_value);
        b_value = parseCrew(b_value);
      } else if (sort_by === "consumables") {
        a_value = convertConsumablesToHours(a_value);
        b_value = convertConsumablesToHours(b_value);
      }

      return order === "asc" ? a_value - b_value : b_value - a_value;
    });

    res.json(starships);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching starships." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
