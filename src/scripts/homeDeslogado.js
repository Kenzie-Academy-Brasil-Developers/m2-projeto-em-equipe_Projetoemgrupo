import { createUser, loginUser } from "./requests.js";

function openModalCadastro() {
    const buttonRegister = document.querySelector(".Botao_Register");
    const modal = document.querySelector(".Modal_Cadastro");
    const buttonCloseModal = document.querySelector(".Fecha_Modal");

    buttonRegister.addEventListener("click", () => {
        modal.classList.add("showModal");
        modal.showModal();
    });

    buttonCloseModal.addEventListener("click", () => {
        modal.classList.remove("showModal");
        modal.close();
    });
}

openModalCadastro();

function createUserForm() {
    const inputs = document.querySelectorAll(".Input_Cadastrar");
    const button = document.querySelector(".Cadastrar");

    const newUser = {};

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        inputs.forEach((input) => {
            newUser[input.name] = input.value;
        });

        const request = await createUser(newUser);
        localStorage.setItem("@kenziePet:cadastro", JSON.stringify(request));
    });

    return newUser;
}

createUserForm();

// Login Gabriel
function openModalLogin() {
    const loginBtn = document.querySelector(".Botao_Login");
    const modalLogin = document.querySelector(".Modal_Login");
    const closeModalBtn = document.querySelector(".closeLoginModal_Btn");
    
    loginBtn.addEventListener("click", () => {
        modalLogin.classList.add("showModal");
        modalLogin.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
        modalLogin.classList.remove("showModal");
        modalLogin.close();
    });
}
openModalLogin();

async function eventLogin() {
    // const form = document.querySelector(".Login_Form");
    const loginBtn = document.querySelector(".Login_Btn");

    const elements = document.querySelectorAll(".Login_Form>input");
    // console.log(elements);
    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const body = {};

        elements.forEach((element) => {
            body[element.name] = element.value;
        });

        await loginUser(body);
    });
}
eventLogin();

function redirecionaLogin(){
    const ancoraCadastro = document.querySelector('.redireciona_loguin')
    const modal = document.querySelector(".Modal_Cadastro");
    const modalLogin = document.querySelector(".Modal_Login");
    

    ancoraCadastro.addEventListener("click", () => {
        modal.classList.remove("showModal");
        modal.close();

       modalLogin.classList.add("showModal");
        modalLogin.showModal();
    });

    
}
redirecionaLogin()

function redirecionaCadastro(){
    const ancoraLogin = document.querySelector('.anchor_register')
    const modal = document.querySelector(".Modal_Login");
    const modalCadastro = document.querySelector(".Modal_Cadastro");
    

    ancoraLogin.addEventListener("click", () => {
        modal.classList.remove("showModal");
        modal.close();

        modalCadastro.classList.add("showModal");
        modalCadastro.showModal();
    });

      
}
redirecionaCadastro()

