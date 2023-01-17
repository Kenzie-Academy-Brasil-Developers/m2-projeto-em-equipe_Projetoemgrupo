import { createUser } from "./requests.js"

function openModalCadastro(){
    const buttonRegister = document.querySelector('.Botao_Register')
    const modal = document.querySelector('.Modal_Cadastro')
    const buttonCloseModal = document.querySelector('.Fecha_Modal')

    buttonRegister.addEventListener('click', () =>{
        modal.showModal()
    })

    buttonCloseModal.addEventListener('click', () =>{
        modal.showModal()
    })
}

openModalCadastro()

function createUserForm(){
    const inputs = document.querySelectorAll('.Input_Cadastrar')
    const button = document.querySelector('.Cadastrar')
    
    const newUser = {}

    button.addEventListener('click', async (event) => {
        event.preventDefault()
        
        inputs.forEach(input => {
            newUser[input.name] = input.value
        })
        
    
       //const request = await createUser(newUser)
       //localStorage.setItem('@kenziePet:cadastro', JSON.stringify(request))
    })
    
    return newUser
}

createUserForm()