import Button from '@mui/material/Button';
import { Link, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

const Header = () => {
    const location = useLocation();
    return (
        <>
            <div>
                <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    component={Link}
                    to="/works/novel"
                    variant={location.pathname === "/works/novel" ? "contained" : "outlined"}
                    id="novels"
                >
                    Novels
                </Button>
                
                <Button
                    component={Link}
                    to="/works/short story"
                    variant={location.pathname === "/works/short%20story" ? "contained" : "outlined"}
                    id="shortstories"
                >
                    Short Stories
                </Button>
                
                <Button
                    component={Link}
                    to="/works/play"
                    variant={location.pathname === "/works/play" ? "contained" : "outlined"}
                    id="plays"
                >
                    Plays
                </Button>
                </Stack>
            </div>
        </>
    )
}

export default Header