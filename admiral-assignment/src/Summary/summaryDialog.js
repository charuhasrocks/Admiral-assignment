import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";

const SummaryDialog = (products) => {
  const { onClose, open, cart } = products;
  const [cartPrice, setCartPrice] = React.useState(cart);

  React.useEffect(() => {
    setCartPrice(cart);
  }, [cart]);

  const handleClose = (reason) => {
    onClose(reason);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleChange = (text, details) => {
    let updatedCart;
    if (text === "minus") {
      if (details.quantity === 1) {
        updatedCart = cartPrice.filter((item) => {
          if (item.name === details.name) {
            item.price *= details.quantity;
            item.quantity = 1;
          }
          return item;
        });
      } else {
        updatedCart = cartPrice.filter((item) => {
          if (item.name === details.name) {
            item.price *= details.quantity - 1;
            item.quantity = details.quantity - 1;
          }
          return item;
        });
      }
    } else {
      updatedCart = cartPrice.filter((item) => {
        if (item.name === details.name) {
          item.price *= details.quantity + 1;
          item.quantity = details.quantity + 1;
        }
        return item;
      });
    }
    setCartPrice(updatedCart);
  };

  const getTotal = () => {
    const total = cartPrice.reduce((prev, curr) => {
      const price = Number(curr.price);
      prev += price;
      return prev;
    }, 0);
    return total;
  };

  return (
    cartPrice.length > 0 && (
      <Dialog
        fullWidth
        maxWidth={"sm"}
        onClose={(e, reason) => handleClose(reason)}
        open={open}
      >
        <DialogTitle>Summary of items</DialogTitle>
        <List sx={{ pt: 0 }}>
          {cartPrice.map((item, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item)}
              key={item}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.name}
                  src={item.image}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText />
              <ListItemText primary={item.name} />
              <ListItemText primary={item.price} />
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button key={index} onClick={() => handleChange("minus", item)}>
                  -
                </Button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                  }}
                >
                  {item.quantity}
                </div>
                <Button key={index} onClick={() => handleChange("plus", item)}>
                  +
                </Button>
              </ButtonGroup>
            </ListItem>
          ))}
        </List>
        <div style={{ textAlign: "right" }}>----------------------</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" gutterBottom>
            Total Price
          </Typography>
          <Typography style={{ paddingRight: "10%" }} variant="h6" gutterBottom>
            {getTotal()}
          </Typography>
        </div>
      </Dialog>
    )
  );
};

export default SummaryDialog;
