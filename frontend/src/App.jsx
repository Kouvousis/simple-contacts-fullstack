import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navbar from "./components/Navigation";

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
      <div className="bg-slate-700 min-h-screen flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <div>
          <ContactList
            contacts={contacts}
            updateContact={openEditModal}
            updateCallBack={onUpdate}
            openCreateModal={openCreateModal}
          />
        </div>

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
