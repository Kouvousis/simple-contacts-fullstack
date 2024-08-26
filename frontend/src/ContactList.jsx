import React from "react";
import { CircleUserRound, CirclePlus, Pencil, Trash2 } from "lucide-react";

const ContactList = ({
  contacts,
  updateContact,
  updateCallBack,
  openCreateModal,
}) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallBack();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col text-white">
      <div className="flex flex-row space-x-2 items-center justify-center mb-4 mt-2">
        <h2 className="text-2xl  font-semibold subpixel-antialiased">
          Contacts
        </h2>
        <CircleUserRound className="mt-1" />
      </div>
      <div className="flex justify-center">
        <table className="table border-spacing-1 w-2/3">
          <thead className="table-header-group">
            <tr className="table-row">
              <th className="table-cell border">First Name</th>
              <th className="table-cell border">Last Name</th>
              <th className="table-cell border">Email</th>
              <th className="table-cell border">Phone Number</th>
              <th className="table-cell border">Actions</th>
            </tr>
          </thead>
          <tbody className="table-row-group text-center">
            {contacts.map((contact) => (
              <tr className="table-row" key={contact.id}>
                <td className="table-cell border">{contact.firstname}</td>
                <td className="table-cell border">{contact.lastname}</td>
                <td className="table-cell border">{contact.email}</td>
                <td className="table-cell border">{contact.phoneNumber}</td>
                <td className="table-cell border p-2">
                  <button
                    className="self-end px-2 py-1 text-white bg-slate-500 rounded hover:text-gray-600 mr-5"
                    onClick={() => updateContact(contact)}
                  >
                    <Pencil />
                  </button>
                  <button
                    className="self-end px-2 py-1 text-white bg-slate-500 rounded hover:text-gray-600"
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="px-2 py-1 text-white hover:text-gray-600 mt-5"
          onClick={openCreateModal}
        >
          <CirclePlus size={35} />
        </button>
      </div>
    </div>
  );
};

export default ContactList;
