/* A cada Requisição coloque um comentário informando quem fez*/

//Gedson
export async function createUser(data){
    const creatUserData = await fetch(`http://localhost:3333/users`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const creatUserDataJson = await creatUserData.json()

    if(!creatUserData.ok){
        alert(`${creatUserDataJson.message}`)
        window.location.replace("./homeDeslogado.html")
        
    }
    else{
        alert(`Cadastro realizado com sucesso`)
        window.location.replace("./homeDeslogado.html")
    }
    return creatUserDataJson
}