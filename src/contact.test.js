const axios = require('axios');
const { v4 } = require('uuid');
const contacts = require('./app/repositories/ContactsRepository');

test('POST - Tentando Criar um Contato com o mesmo e-mail de um já criado', async () => {

    let contacts = 
        {
            id: v4(),
            name: 'Joao',
            email: 'joao@gmail.com',
            phone: '3424656',
            category_id: v4(),
        }

    const response = await axios.post('http://localhost:3000/contacts', contacts).catch(function (error) {
        if(error.response) {

            expect(error.response.status).toBe(400);

            expect(error.response.data).toHaveProperty('error', "This e-mail is already been taken");
        }
    });
})

test('POST - Tentando Criar um Contato com todas as propriedas iguais apenas modificando o e-mail', async () => {

    let contacts = 
        {
            id: v4(),
            name: 'Joao',
            email: 'turco@gmail.com',
            phone: '3424656',
            category_id: v4(),
        }

    const response = await axios.post('http://localhost:3000/contacts', contacts);

    expect(response.status).toBe(200);

    
})

test('POST - Tentando Criar um Contato com todas as propriedas iguais apenas modificando o e-mail, mas agora sem enviar o nome', async () => {

    let contacts = 
        {
            id: v4(),
            email: 'semnome@gmail.com',
            phone: '3424656',
            category_id: v4(),
        }

    const response = await axios.post('http://localhost:3000/contacts', contacts).catch(function (error) {
        if(error.response) {

            expect(error.response.status).toBe(400);

            expect(error.response.data).toHaveProperty('error', "Name is Required");
        }
    });
})

test('POST - Tentando Criar um Contato com um email já criado e sem o nome', async () => {

    let contacts = 
        {
            id: v4(),
            email: 'turco@gmail.com',
            phone: '3424656',
            category_id: v4(),
        }

    const response = await axios.post('http://localhost:3000/contacts', contacts).catch(function (error) {
        if(error.response) {

            expect(error.response.status).toBe(400);

            expect(error.response.data).toHaveProperty('error', "This e-mail is already been taken and Name is Required");
        }
    });
})

test('GET - Listando todos os contatos cadastrados', async () => {

    const response = await axios.get('http://localhost:3000/contacts');

    expect(response.status).toBe(200);
   
})

// test('GET - Pegando algum contato pelo ID', async () => {

//     const response = await axios.get('http://localhost:3000/contacts');

//     expect(response.status).toBe(200);
   
// })

// test('DELETE - Tentando deletar o Primeiro usuário criado no sistema', async () => {

//     let contacts = 
//         {
//             id: v4(),
//             name: 'Joao',
//             email: 'turco@gmail.com',
//             phone: '3424656',
//             category_id: v4(),
//         }

//     const response = await axios.post('http://localhost:3000/contacts', contacts);

//     expect(response.status).toBe(200);

    
// })


test('PUT -> Alterar o primeiro contato criado no servidor', async (request) => {

    const firtsContactId = contacts[0].id;

    const getCategoryId = contacts[0].category_id;

    let contacts = {
        name: "Joao",
        email: "joao@gmail.com",
        phone: "3424656",
        category_id: getCategoryId,
    }

    const response = await axios.put(`http://localhost:3000/contacts/${firtsContactId}`, contacts);

    expect(response.status).toBe(200);

    // expect(response.data).toHaveProperty('message', 'Tarefa Comer atualizada com sucesso');

})

// test('PUT -> Tentando alterar um contato inexistente', async (request) => {

//     const firtsContact = contacts[0]

//     // const { id, category_id } = request.params;

//     // let contacts = {
//     //     name: "Joao",
//     //     email: "joao@gmail.com",
//     //     phone: "3424656",
//     //     category_id: category_id,
//     // }

//     const response = await axios.put(`http://localhost:3000/contacts/${id}`, firtsContact);

//     expect(response.status).toBe(200);

//     // expect(response.data).toHaveProperty('message', 'Tarefa Comer atualizada com sucesso');

// })

// test('PUT -> Tentando alterar um contato sem passar o nome', async (request) => {

//     const firtsContact = contacts[0]

//     // const { id, category_id } = request.params;

//     // let contacts = {
//     //   
//     //     email: "joao@gmail.com",
//     //     phone: "3424656",
//     //     category_id: category_id,
//     // }

//     const response = await axios.put(`http://localhost:3000/contacts/${id}`, firtsContact);

//     expect(response.status).toBe(200);

//     // expect(response.data).toHaveProperty('message', 'Tarefa Comer atualizada com sucesso');

// })
