from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80) , unique=False, nullable=False)
    last_name = db.Column(db.String(80) , unique=False, nullable=False)
    email = db.Column(db.String(120) , unique=True, nullable=False)
    phone_number = db.Column(db.String(30), unique=True, nullable=False)
    
    def to_json(self):
        return {
            "id": self.id,
            "firstname": self.first_name,
            "lastname": self.last_name,
            "email": self.email,
            "phoneNumber": self.phone_number
        }