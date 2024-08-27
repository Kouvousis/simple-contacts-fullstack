from flask import request, jsonify
from config import app, db
from models import Contact
import re

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts =list(map(lambda contact: contact.to_json(), contacts))
    return jsonify({"contacts": json_contacts})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstname")
    last_name = request.json.get("lastname")
    email = request.json.get("email")
    phone_number = request.json.get("phoneNumber")
    
    name_pattern = "^[A-Za-z]+([ '-][A-Za-z]+)*$"
    phone_pattern = "^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$"
    email_pattern = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
    
    errors = {}
    
    if not first_name or not re.match(name_pattern, first_name):
        errors["firstname"] = "Invalid first name."

    if not last_name or not re.match(name_pattern, last_name):
        errors["lastname"] = "Invalid last name."

    if not email or not re.match(email_pattern, email):
        errors["email"] = "Invalid email address."

    if not phone_number or not re.match(phone_pattern, phone_number):
        errors["phoneNumber"] = "Invalid phone number."
    
    if errors:
        return jsonify({"errors": errors}), 400

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Contact created!"}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "Contact not found."}), 404
    
    data = request.json
    
    first_name = data.get("firstname", contact.first_name)
    last_name = data.get("lastname", contact.last_name)
    email = data.get("email", contact.email)
    phone_number = data.get("phoneNumber", contact.phone_number)
    
    name_pattern = "^[A-Za-z]+([ '-][A-Za-z]+)*$"
    phone_pattern = "^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$"
    email_pattern = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
    
    errors = {}

    if not first_name or not re.match(name_pattern, first_name):
        errors["firstname"] = "Invalid first name."

    if not last_name or not re.match(name_pattern, last_name):
        errors["lastname"] = "Invalid last name."

    if not email or not re.match(email_pattern, email):
        errors["email"] = "Invalid email address."

    if not phone_number or not re.match(phone_pattern, phone_number):
        errors["phoneNumber"] = "Invalid phone number."

    if errors:
        return jsonify({"errors": errors}), 400
    
    
    contact.first_name = data.get("firstname", contact.first_name)
    contact.last_name = data.get("lastname", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.phone_number = data.get("phoneNumber", contact.phone_number)
    
    db.session.commit()
    
    return jsonify({"message": "Contact updated."}), 200


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "Contact not found."}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "Contact deleted."}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    
    app.run(debug=True)
    