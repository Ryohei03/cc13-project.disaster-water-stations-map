const dotenv = require("dotenv").config();
const fs = require("fs");
const db = require("../server/knex.js");

(async () => {
  try {
    const locations = JSON.parse(fs.readFileSync("./seeds/locations.json"));
    for (const location of locations) {
      const id = location.Id;
      const name = location.Name;
      const address = location.Address;
      const latitude = location.Latitude;
      const longitude = location.Longitude;
      const url = location.URL;

      const result = await db("locations").insert({
        id,
        name,
        address,
        latitude,
        longitude,
        url,
      });
      console.log(result);
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
})();
