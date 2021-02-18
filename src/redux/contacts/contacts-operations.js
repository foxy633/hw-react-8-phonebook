import * as serviceAPI from "../../services/service-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await serviceAPI.fetchContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, { rejectWithValue }) => {
    console.log(name);
    console.log(number);
    const contact = { name, number };

    try {
      const { data } = await serviceAPI.addContact(contact);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await serviceAPI.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
