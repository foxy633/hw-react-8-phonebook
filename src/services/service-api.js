import axios from "axios";

export function fetchContacts() {
  return axios.get(`/contacts`);
}

export function addContact(contact) {
  return axios.post("/contacts", contact);
}

export function deleteContact(id) {
  return axios.delete(`/contacts/${id}`);
}
