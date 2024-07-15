import { AppBar, Toolbar } from "@mui/material";

import Logo from "./shared/Logo";
import { UseAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = UseAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                to="/"
                text="logout"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
                <NavigationLink
                bg="#00fffc"
                to="/login"
                text="login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
