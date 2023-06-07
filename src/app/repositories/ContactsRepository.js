const { v4 } = require('uuid');

const contacts = [
    {
        id: v4(),
        name: 'Joao',
        email: 'joao@gmail.com',
        phone: '3424656',
        category_id: v4(),
    },
    {
        id: v4(),
        name: 'Tiao Gaviao',
        email: 'gaviaotiao@gmail.com',
        phone: '999999999',
        category_id: v4(),
    },
];

class ContactsRepository{
    findAll() {
        return new Promise((resolve) => resolve(contacts));
    }
   
    findById(id){
        return new Promise((resolve) => resolve(
            contacts.find((contact) => contact.id === id),
        ));
    }

    findByEmail(email){
        return new Promise((resolve) => resolve(
            contacts.find((contact) => contact.email === email),
        ));
    }

    delete(id){
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => contact.id !== id); 
            resolve();
        });
    }

    create({name, email, phone, category_id}){
        return new Promise((resolve) => {
            const newContact = {
                id:v4(),
                name,
                email,
                phone,
                category_id,
            };

            contacts.push(newContact);

            resolve(newContact);
        });
    }

    update(id, {name, email, phone, category_id}){
        return new Promise((resolve) => {
            const updatedContact = {
                id,
                name,
                email,
                phone,
                category_id,
            };

            contacts = contacts.map((contact) => (
                contact.id == id ? updatedContact : contact
            ));

            resolve(updatedContact);
        });
    }
}

module.exports = new ContactsRepository();

