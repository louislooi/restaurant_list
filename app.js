// Initial variables
const express = require("express");
const app = express();
const port = 3000;
const restaurantsList = require("./restaurant.json");

// require express-handlebars here
const exphbs = require("express-handlebars");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurant: restaurantsList.results });
});

app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurantsList.results.find(
    (restaurant) => restaurant.id.toString() == req.params.id
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const restaurants = restaurantsList.results;
  let searchResult = [];

  for (let i = 0; i < restaurants.length; i++) {
    if (
      restaurants[i].name.toLowerCase().includes(keyword) ||
      restaurants[i].category.toLowerCase().includes(keyword)
    ) {
      searchResult.push(restaurants[i]);
    }
  }

  // const restaurant = restaurantsList.results.filter((restaurant) => {
  //   return restaurant.name.includes(keyword);
  // });
  res.render("index", { restaurant: searchResult, keyword: keyword });
});

//set static files
app.use(express.static("public"));

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
