

function openProfile(){
    const profileButton = document.querySelector(".Botao_Profile")

    profileButton.addEventListener("click", ()=>{
        window.location.replace("perfil.html")
      
    })
}
openProfile()
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

         const button = document.querySelector(".Botao_Logout")
     button.addEventListener("click",()=>    {
         console.log("funcionando")
        localStorage.removeItem("@kenziePet:cadastro");
        window.location.replace("/homeDeslogado.html")
     })
    
}
logout()
