const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("static"));

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

app.get("/api/getData", (_, res) => {
  const data1 = {
    Products: [
      {
        id: "1",
        name: "Cadbury",
        price: "70",
        image: "http://localhost:9000/cadbury.jpg",
        quantity: 1,
      },
      {
        id: "2",
        name: "Kitkat",
        price: "80",
        image: "http://localhost:9000/kitkat.jpg",
        quantity: 1,
      },
      {
        id: "3",
        name: "5 Star",
        price: "90",
        image: "http://localhost:9000/star5.jpg",
        quantity: 1,
      },
    ],
  };
  res.json(data1);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
