import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function SpinnerCarregamento() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" p={4} >
            <CircularProgress sx={{ color: "#4A9DCD" }} />
        </Box>
    );
}
