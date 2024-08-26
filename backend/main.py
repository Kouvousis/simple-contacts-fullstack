from flask import request, jsonify
from config import app, db
from models import Contact

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
    
    if not first_name or not last_name or not email or not phone_number:
        return jsonify({"message": "You must include a first name, last name and email."}), 400

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
    