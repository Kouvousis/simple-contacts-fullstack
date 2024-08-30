import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Modal from "./Modal";

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

        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <ContactForm
            existingContact={currentContact}
            updateCallback={onUpdate}
          />
        </Modal>

        <Footer />
      </div>
    </>
  );
}

export default App;
