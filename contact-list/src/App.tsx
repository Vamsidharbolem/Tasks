import React from "react";
import { CssBaseline, Container, Typography, Paper, Box } from "@mui/material";
import ContactList from "./ContactList";

function App() {
  return (
    <Box sx={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper elevation={5} sx={{ padding: 4, marginTop: 6, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#3f51b5" }}>
            Contact Manager
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Manage and store your contacts easily.
          </Typography>
          <ContactList />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;