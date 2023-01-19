/* A cada Requisição coloque um comentário informando quem fez*/
//Gedson
export async function createUser(data) {
    const creatUserData = await fetch(`http://localhost:3333/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const creatUserDataJson = await creatUserData.json();

    if (!creatUserData.ok) {
        alert(`${creatUserDataJson.message}`);
        window.location.replace("./homeDeslogado.html");
    } else {
        alert(`Cadastro realizado com sucesso`);
        window.location.replace("./homeDeslogado.html");
    }
    return creatUserDataJson;
}

// Gabriel
export async function loginUser(dataLogin) {
    try {
        const request = await fetch(`http://localhost:3333/session/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataLogin),
        });
        let requestJson = await request.json();
            console.log(requestJson)
        if (requestJson.token) {
            localStorage.setItem("token", JSON.stringify(requestJson.token));
            // console.log("logou");

            window.location.replace("./src/pages/homeLogado.html");
            return requestJson;

        } else {
            console.log(requestJson.message);
        }
    } catch (err) {
        console.log(err);
    }
    
}


//Vitor
//Atualizar Perfil
export async function updateProfile(data){
    const update = await fetch("http://localhost:3333/users/profile",{
        method: "PACTH",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const updateJson = await update.json()

    if(!updateJson.ok){
        alert("ERRO AO ATUALIZAR PERFIL")
    }else{
        alert("PERFIL ATUALIZADO")
    }

    return updateJson

}

//Vitor
//Deletar perfil
export async function deleteProfile(){
    const deleteUser = await fetch('http://localhost:3333/users/profile',{
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`
        }
    })
        if(!deleteUser.ok){
            alert("ERRO AO DELETAR PERFIL")
        }else{
            alert("PERFIL DELETADO")
            window.location.replace("../homeDeslogado.html")
        }

}
