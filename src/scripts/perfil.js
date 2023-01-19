import{ProfilePage} from'./requests.js'
//import{logout} from "./homeLogado.js"

ProfilePage()

export function renderProfile(data){
    if(window.location.pathname == "/src/pages/perfil.html"){
        let {avatar_url, name, email, my_pets } = data
        const main= document.querySelector("main")
     
        main.insertAdjacentHTML("beforeend",`
        <div class="profile">
        <div class="profile-banner"></div>
        <div class="profile-container">
            <img src="${avatar_url}" class="profile-img">
            <div class="profile-info">
                <div class="title-container">
                    <h3 class="profile-info-title">Dados Pessoais</h3>
                </div>
            <div class="info-container">
                <p class="profile-name">Nome: ${name}</p>
                <p class="profile-email">E-mail: ${email}</p>
                <p class="birth-date">Data de nascimento: 21/03/2000</p>
            </div>
            <div class="buttonSection">
                <button class="change-info">Atualizar Informações</button>
                <button class="delete-account">Deletar Conta</button>
            </div>
            </div>
        </div>
     </div> 
          <div class="pet-section">
             <button class ="register-pet">Cadastrar novo pet</button>
             <div class="user-pets">
            </div>
        `)

    }
  
}
function backHome (){
   
    if(window.location.pathname == "/src/pages/perfil.html"){
        
       const button = document.querySelector(".Botao_Home")
        button.addEventListener("click", ()=>{
        window.location.replace("homeLogado.html")
        })
    }

}
backHome()
  

function logout(){
        if(window.location.pathname == "/src/pages/perfil.html"){

         const button = document.querySelector(".Botao_Logout")
         button.addEventListener("click",()=>    {
         localStorage.removeItem("@kenziePet:cadastro");
         window.location.replace("/homedeslogado.html")
     })
}
}
logout()
