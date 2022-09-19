import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MediaCard = ({ details, addList }) => {
  return (
    <Card key={details.id}>
      <CardMedia
        component="img"
        height="140"
        image={details.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {details.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary">
          Price: {details.price}Rs
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => addList(details)}
        >
          {!details.isAdded ? "Add to cart" : "Remove from cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
