import React from "react";

import { Button } from "@material-ui/core";
import { CryptoState } from "../../CryptoContex";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { setAlert } = CryptoState();

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 90,
          height: 40,
          marginLeft: 15,
          borderRadius: "15px",
          backgroundColor: "#EEBC1D",
        }}
        onClick={logOut}
      >
        LogOut
      </Button>
    </div>
  );
}
