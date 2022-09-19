import * as React from "react";
import Button from "@mui/material/Button";
import SummaryDialog from "./summaryDialog";

const SummaryCart = ({ cart }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    if (value === "backdropClick") setOpen(false);
  };

  return (
    <div>
      <br />
      <Button
        style={{ color: "000000", left: "80%" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Click To Checkout
      </Button>
      <SummaryDialog open={open} onClose={handleClose} cart={cart} />
    </div>
  );
};

export default SummaryCart;
