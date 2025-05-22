import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { Delete, Edit, PersonAdd, Search, CloudUpload } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  photo: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("https://via.placeholder.com/50");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setFilteredContacts(contacts);
  }, [contacts]);

  const handleSearch = () => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleAddContact = () => {
    setIsAdding(true);
  };

  const addOrUpdateContact = () => {
    if (!name || !phone) {
      setSnackbarMessage("Name and Phone are required!");
      setSnackbarOpen(true);
      return;
    }

    let updatedContacts;

    if (editingId) {
      updatedContacts = contacts.map((contact) =>
        contact.id === editingId ? { ...contact, name, phone, email, address, photo } : contact
      );
      setSnackbarMessage("Contact updated successfully!");
    } else {
      const newContact: Contact = { id: uuidv4(), name, phone, email, address, photo };
      updatedContacts = [...contacts, newContact];
      setSnackbarMessage("Contact added successfully!");
    }

    setContacts(updatedContacts);
    resetForm();
    setIsAdding(false);
    setSnackbarOpen(true);
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setSnackbarMessage("Contact deleted successfully!");
    setSnackbarOpen(true);
  };

  const editContact = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email || "");
    setAddress(contact.address || "");
    setPhoto(contact.photo);
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setPhoto("https://via.placeholder.com/50");
    setEditingId(null);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={() => setIsSearching(!isSearching)}
        >
          Search Contacts
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleAddContact}
        >
          Add Contact
        </Button>
      </Stack>

      {isSearching && (
        <TextField
          label="Search Contacts"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell><Avatar src={contact.photo} /></TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email || "N/A"}</TableCell>
                <TableCell>{contact.address || "N/A"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => editContact(contact)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => deleteContact(contact.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isAdding} onClose={() => setIsAdding(false)} fullWidth>
        <DialogTitle>{editingId ? "Edit Contact" : "Add Contact"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Email (Optional)" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
          <TextField label="Address (Optional)" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth margin="normal" />
          
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            <CloudUpload sx={{ mr: 1 }} /> Upload Photo
            <input type="file" accept="image/*" hidden onChange={handlePhotoChange} />
          </Button>

          {photo && (
            <Avatar src={photo} sx={{ width: 80, height: 80, mt: 2, mx: "auto" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAdding(false)} color="secondary">Cancel</Button>
          <Button onClick={addOrUpdateContact} color="primary" variant="contained">{editingId ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="info">{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
}
