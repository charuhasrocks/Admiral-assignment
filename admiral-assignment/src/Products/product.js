import { useState, useEffect } from "react";
import Card from "../MediaCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../main.css";
import SummaryCart from "../Summary/cartSummary";
import { Typography } from "@mui/material";

const Products = () => {
  const [result, setResult] = useState([]);
  const [addedList, setAddedList] = useState([]);

  const handleCartChanges = (details) => {
    const isItemAdded = addedList.find((item) => item.name === details.name);
    if (isItemAdded) {
      const updatedList = addedList.filter(
        (item) => item.name !== details.name
      );
      const updatedResults = result.filter((item) => {
        if (item.name === details.name) item.isAdded = false;
        return item;
      });
      setResult(updatedResults);
      setAddedList(updatedList);
    } else {
      setAddedList([...addedList, details]);
      const updatedResults = result.filter((item) => {
        if (item.name === details.name) item.isAdded = true;
        return item;
      });
      setResult(updatedResults);
    }
  };

  useEffect(() => {
    fetch("/api/getData", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        data.Products.filter(
          (item) => (item.isAdded = false && (item.quantity = 1))
        );
        setResult(data.Products);
      })
      .catch((_error) => setResult([]));
  }, []);

  return (
    <Typography variant={"h5"}>
      {"Select Products"}
      <Box
        sx={{
          width: 600,
          height: 500,
        }}
      >
        <Grid className="c-centre" container rowSpacing={1} spacing={2}>
          {result.map((item) => (
            <Grid item xs={6} md={4}>
              <Card details={item} addList={handleCartChanges} />
            </Grid>
          ))}
        </Grid>
        <SummaryCart cart={addedList} />
      </Box>
    </Typography>
  );
};

export default Products;
