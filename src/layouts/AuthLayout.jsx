import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <Box sx={{ width: '100%', maxWidth: '120rem', margin: '0 auto'}}>
            <Outlet />
        </Box>
    );
};