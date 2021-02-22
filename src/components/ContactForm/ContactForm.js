import React, { useState } from "react";
import styles from "./contactForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import * as operations from "../../redux/contacts/contacts-operations";
import { getContacts } from "../../redux/contacts/contacts-selectors";

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const onSubmit = (name, number) =>
    dispatch(operations.addContact({ name, number }));

  const newContact = () => {
    const includeName = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      []
    );
    const includeNumber = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      []
    );
    if (name === "" || number === "") {
      toast("Please enter all fields!");
      return true;
    }
    if (includeName.includes(name)) {
      toast(`${name} is already in contacts`);
      return true;
    } else if (includeNumber.includes(number)) {
      toast(`${number} is already in contacts`);
      return true;
    }
  };

  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetName();
    resetNumber();
    if (newContact()) {
      return;
    }
    onSubmit(name, number);
  };

  const resetName = () => {
    setName("");
  };
  const resetNumber = () => {
    setNumber("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.form_label}>
        Name
        <input
          className={styles.form_input}
          type="text"
          name="name"
          value={name}
          placeholder="Name Surname"
          onChange={handleChangeName}
        />
      </label>
      <label className={styles.form_label}>
        Number
        <input
          className={styles.form_input}
          type="text"
          name="number"
          value={number}
          onChange={handleChangeNumber}
          placeholder="000-00-00"
        />
      </label>
      <button className={styles.form_button} type="submit">
        Add contact
      </button>
    </form>
  );
}
