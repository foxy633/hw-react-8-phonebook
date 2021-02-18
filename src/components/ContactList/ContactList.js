import React from "react";
import styles from "./contactList.module.css";
import { useSelector, useDispatch} from "react-redux";
import {deleteContact}from "../../redux/contacts/contacts-operations";
import { getVisibleContacts } from "../../redux/contacts/contacts-selectors";

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();
  const onDeleteContact = (id) => dispatch(deleteContact(id));

  return (
    <ul className={styles.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={styles.list_item} key={id}>
          {`${name} : ${number}`}
          {
            <button
              className={styles.list_button}
              type="button"
              name="delete"
              onClick={() => onDeleteContact(id)}
            >
              delete
            </button>
          }
        </li>
      ))}
    </ul>
  );
}
