import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <div className="bg-slate-700 min-h-screen">
        <ContactList
          contacts={contacts}
          updateContact={openEditModal}
          updateCallBack={onUpdate}
          openCreateModal={openCreateModal}
        />

        {isModalOpen && (
          <div>
            <div
              className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
                open ? "visible bg-black/40" : "invisible"
              }`}
            >
              <ContactForm
                existingContact={currentContact}
                updateCallback={onUpdate}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
