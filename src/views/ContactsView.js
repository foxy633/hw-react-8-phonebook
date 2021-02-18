import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Filter from "../components/Filter";
import Section from "../components/Section";
import { fetchContacts } from "../redux/contacts/contacts-operations";
import { getLoading } from "../redux/contacts/contacts-selectors";

const styles = {
  phonebook: {
    textAlign: "center",
    margin: "0",
  },
  contacts: {
    textAlign: "center",
    margin: "10px",
  },
};

export default function ContactsView() {
  const loadingContacts = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Section>
      <h1 style={styles.phonebook}>phonebook</h1>

      <ContactForm />

      {loadingContacts && <p>loading...</p>}
      <h2 style={styles.contacts}>Contacts</h2>

      <Filter />

      <ContactList />
    </Section>
  );
}
