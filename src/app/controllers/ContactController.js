const { response, json } = require('express');
const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {

    async index(request,response) {
        // Listar todos os registros
        // Utilizamos o await para manter a função na callstack até ser resolvida, sem jogar para a ThreadPool e executar
        // funções seguintes, até porque precisamos dos dados aqui antes de qualquer coisa
        const contacts = await ContactsRepository.findAll();

        response.json(contacts);
    }

    async show(request, response){

        const { id } = request.params;

        const contact = await ContactsRepository.findById(id);
        // Obter um registro
        
        if(!contact){
            return response.status(404).json( {error: "User not found "});
        }

        response.json(contact);
    }
 
    async store(request, response){
        // Criar um novo registro
        const {name, email, phone, category_id} = request.body;

        const contactExists = await ContactsRepository.findByEmail(email);

        if(contactExists && !name){
            return response.status(400).json({ error: 'This e-mail is already been taken and Name is Required'});
        }

        if(!name){
            return response.status(400).json({ error: 'Name is Required'});
        }

        if (contactExists){
            return response.status(400).json({ error: 'This e-mail is already been taken'});
        }

        const contact = await ContactsRepository.create({
            name, email, phone, category_id,
        });

        response.json(contact);
    }

    async update(request,response){
        // Editar um registro
        const { id } = request.params;

        const {name, email, phone, category_id} = request.body;

        const contactExists = await ContactsRepository.findById(id);

        if(!contactExists) {
            return response.status(400).json({ error: 'User not Found'});
        }

        if(!name){
            return response.status(400).json({ error: 'Name is Required'});
        }

        const contactByEmail = await ContactsRepository.findByEmail(email);

        if (contactByEmail && contactByEmail.id !== id){
            return response.status(400).json({ error: 'This e-mail is already been taken'});
        }

        const contact = await ContactsRepository.update(id, {
            name, email, phone, category_id
        })

        response.json(contact);
    }

    async delete(request, response){
        // Deletar um registro

        const { id } = request.params;

        const contact = await ContactsRepository.findById(id);
        
        
        if(!contact){
            return response.status(404).json( {error: "User not found "});
        }

        await ContactsRepository.delete(id);

        response.sendStatus(204);

    }
}


// Singleton
// uso o new pq todo mundo que utilizar a classe ContactController, utilize essa mesma instância
// Aqui importamos a instância e não a classe em si
module.exports = new ContactController();

