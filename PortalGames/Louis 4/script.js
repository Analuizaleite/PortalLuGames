let url = "https://api.rawg.io/api/games?key=6404b37c95434349b631b1656db83e77";
let creatorsURL = "https://api.rawg.io/api/creators?key=6404b37c95434349b631b1656db83e77";
let storesURL = "https://api.rawg.io/api/stores?key=6404b37c95434349b631b1656db83e77"
let plataformsURL = "https://api.rawg.io/api/platforms?key=6404b37c95434349b631b1656db83e77"
const req = new XMLHttpRequest();

req.onreadystatechange = function(){
    if(req.readyState==4){
        atualizaDados(this.responseText);
    }
   
}

req.open("GET", url);
req.send();

function inserirCriadores(){
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let x = JSON.parse(this.responseText)
            let creators = document.querySelector(".cards")

            for(let i = 0; i < 5; i++){
                creators.innerHTML += `
                <div class="unidade">
                    <div><span><strong>${x.results[i].name}</strong></span></div>
                    <img src="${x.results[i].image}" style="width: 250px; height: 250px;">
                    <p style="font-size:22px">Criador de: ${x.results[i].games[4].name}</p>
                </div>
                `
            }
        }
    }
    
    req2.open("GET", creatorsURL);
    req2.send();
}

function inserirPlataformas(){
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let y = JSON.parse(this.responseText)
            let plat = document.querySelector("#resp>div")

            for(let i = 0; i < 6; i++){
                plat.innerHTML += `
                <div class="umdetres">
                    <h3><strong>${y.results[i].name}</strong></h3>
                    <img src="${y.results[i].image_background}" alt="${y.results[i].name}" style="width: 400px; height: 200px;">
                    
                   
                </div>
                `
            }
        }
    }
    
    req2.open("GET", plataformsURL);
    req2.send();
}
function inserirLoja(){
    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let w = JSON.parse(this.responseText)
            let lojas = document.querySelector(".carrosel")

            for(let i = 0; i < w.results.length; i++){
                lojas.innerHTML += `
                <div class="PAINEL">
                    <div class="latam">
                        <img src="${w.results[i].image_background}" alt="${w.results[i].name}" style="width: 480px; height: 360px;">
                        <div>
                            <h2>${w.results[i].name}</h2> 
                        
                        </div>
                    </div>
                </div>
                `
            }

            carousel();
        }
    }

    req2.open("GET", storesURL);
    req2.send();
}

function atualizaDados(resposta){
    inserirCriadores();
    inserirPlataformas();
    inserirLoja()

    console.log(resposta)
    resposta=JSON.parse(resposta)
    let showsBrasil = document.querySelector("#LTWT .Brasil")
  
    for (let i=0;i<3;i++){
     showsBrasil.innerHTML+=`
                 <div class="Brasil">
                    <div><span><strong>${resposta.results[i].name}</strong></span></div>
                    <img src="${resposta.results[i].background_image}" style="width:450px;height:300px">
                    <ul>
                        <li><strong>Rating:</strong> ${resposta.results[i].metacritic}/100</li>
                        <li><strong>Genre:</strong> ${resposta.results[i].genres[0].name}</li>
                        <li><strong> Release date:</strong> ${resposta.results[i].released}</li>
                    </ul>
                    <strong style="color:#FF4F63; font-size:25px"><p onclick=detalhes(${resposta.results[i].id})>+Detalhes</p></strong>
                </div>
     `
    }


}

function pesquisa(){
    let resultPesquisa = document.getElementById("resultadosPesquisa")
    let input = document.getElementById("barra")
    console.log(input.value)
   
    req.onreadystatechange = function(){
        if(req.readyState==4){
            resultPesquisa.innerHTML=""
            let resposta = JSON.parse(this.responseText)
            console.log(this.responseText);
            
            for(let i=0;i<10;i++){
                resultPesquisa.innerHTML+=`<p onclick=detalhes(${resposta.results[i].id})>${resposta.results[i].name}</p>
                `
            }
        }
       
    }

    if(input.value!=""){
        req.open("GET", `https://api.rawg.io/api/games?key=6404b37c95434349b631b1656db83e77&search=${input.value}`);
    req.send();
    }
    else{
        resultPesquisa.innerHTML=""
    }
}
function detalhes(idJogo){
    localStorage.setItem("jogo",idJogo)
    window.location.href="detalhes.html"
}

