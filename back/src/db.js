import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initializeDatabase = async () => {
  const db = await sqlite.open("./db.sqlite");

  /**
   * retrieves the contacts from the database
   * @function getContactsList
   * @param {string} orderBy an optional string that is either "name" or "email"
   * @returns {array} the list of contacts
   */

  const getContactsList = async orderby => {
   try {let stmt = "SELECT contact_id AS id, name, email FROM contacts";
    switch (orderby) {
      case "name":
        stmt += " Order by name";
        break;
      case "email":
        stmt += " Order by email";
        break;
      default:
        break;
    }
    const rows = await db.all(stmt);
    if(rows.length === 0)
    {
      throw Error("no contacts found!")
    }
    return rows;}
    catch(err)
    {
      throw Error("could not retrieve list!")
    }
  };

  /**
   * retrieves the contacts from the database
   * @function getContact
   * @param {number} id id to search by
   * @returns {array} contact found
   */
  const getContact = async id => {
    try {
      let stmt = `SELECT contact_id AS id, name, email FROM contacts where contact_id = ${id}`;

      const rows = await db.all(stmt);

      const contact = rows[0];
      if (!contact) {
        throw Error(` contact with id = ${id} doesnt exist`);
      } else return contact;
    } catch (err) {
      throw Error(`could not get contact with id = ${id}` + err.message);
    }
  };

  const createContact = async props => {
    const { name, email } = props;
    if (!props && !name && !email) {
      throw Error("you must provide a name and email");
    }
    try {
      const result = await db.run(
        SQL`INSERT INTO contacts (name, email) Values (${name}, ${email})`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      throw Error("cannot insert this combination of name and email");
    }
  };

  const deleteContact = async id => {
    try {
      const result = await db.run(
        SQL`Delete from contacts where contact_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw Error(`could not delete contact with id = ${id}`);
      }
      return true;
    } catch (err) {
      throw Error("could not delete contact");
    }
  };

  const updateContact = async (id, props) => {
    const { name, email } = props;
    if (!props && !name && !email) {
      throw Error("you must provide a name or an email");
    }
    try {
      let stmt;
      if (name && email) {
        stmt = `UPDATE contacts SET email= '${email}' , name = '${name}' WHERE contact_id = ${id}`;
      } else if (name && !email) {
        stmt = `UPDATE contacts SET name = '${name}' WHERE contact_id = ${id}`;
      } else if (email && !name) {
        stmt = `UPDATE contacts SET email= '${email}'  WHERE contact_id = ${id}`;
      }
      console.log(stmt);
      const result = await db.run(stmt);
      if (result.stmt.changes === 0) {
        throw Error(`could not update the contact with id = ${id}`);
      }
      return true;
    } catch (err) {
      throw Error(`could not update the contact with id = ${id}` + err.message);
    }
  };

  const controller = {
    getContactsList,
    createContact,
    deleteContact,
    updateContact,
    getContact
  };
  return controller;
};
export default initializeDatabase;
