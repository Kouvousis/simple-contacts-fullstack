import { useState } from "react";
import { X } from "lucide-react";

const ContactForm = ({ existingContact = {}, updateCallback, closeModal }) => {
  const [firstname, setFirstname] = useState(existingContact.firstname || "");
  const [lastname, setLastname] = useState(existingContact.lastname || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    existingContact.phoneNumber || ""
  );

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      email,
      phoneNumber,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };

  return (
    <div className="w-full max-w-lg p-6 flex flex-col rounded bg-slate-700 shadow-lg">
      <button
        onClick={closeModal}
        type="button"
        className="self-end text-white hover:text-gray-600"
      >
        <X />
      </button>
      <div className="flex flex-col mb-3 text-white text-center">
        <span>Create new contact</span>
      </div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="firstname">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="p-1 pl-2 rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="lastname">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="rounded p-1 pl-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded p-1 pl-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="email">
            Phone number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded p-1 pl-2"
          />
        </div>
        <button
          className="self-end px-2 py-1 text-white bg-slate-500 rounded hover:text-gray-600"
          type="submit"
        >
          {updating ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
