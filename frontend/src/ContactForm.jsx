import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstname, setFirstname] = useState(existingContact.firstname || "");
  const [lastname, setLastname] = useState(existingContact.lastname || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    existingContact.phoneNumber || ""
  );

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    // Reset error states
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneNumberError("");

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
    const result = await response.json();

    if (response.status !== 201 && response.status !== 200) {
      if (result.errors) {
        setFirstnameError(result.errors.firstname || "");
        setLastnameError(result.errors.lastname || "");
        setEmailError(result.errors.email || "");
        setPhoneNumberError(result.errors.phoneNumber || "");
      }
    } else {
      updateCallback();
    }
  };

  return (
    <div className="w-full max-w-lg p-4 flex flex-col rounded-b bg-slate-700 shadow-lg">
      <div className="flex flex-col mb-3 text-white text-center">
        <span>Create new contact</span>
      </div>
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="firstname">
            First Name*:
          </label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className={`p-1 pl-2 rounded ${
              firstnameError ? "border border-red-500 outline-none" : ""
            }`}
          />
          {firstnameError && (
            <p className="text-red-500 text-sm">{firstnameError}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="lastname">
            Last Name*:
          </label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className={`rounded p-1 pl-2 ${
              lastnameError ? "border border-red-500 outline-none" : ""
            }`}
          />
          {lastnameError && (
            <p className="text-red-500 text-sm">{lastnameError}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="email">
            Email*:
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`rounded p-1 pl-2 ${
              emailError ? "border border-red-500 outline-none" : ""
            }`}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-1/4 text-white" htmlFor="email">
            Phone number*:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`rounded p-1 pl-2 ${
              phoneNumberError ? "border border-red-500 outline-none" : ""
            }`}
          />
          {phoneNumberError && (
            <p className="text-red-500 text-sm">{phoneNumberError}</p>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-white text-sm italic">* Required Fields</span>
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
