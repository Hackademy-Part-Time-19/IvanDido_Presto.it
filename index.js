function vaiAllaRegistrazione(){
    window.location.href = `registrazione.html`;
}

function vaiAllaHomePage(){
    window.location.href = `landing-page.html`;
}


function vaiAllaCategoria(categoria){ 
    window.location.href = `catalogo.html?categoria=${categoria}`;
    filtraCategoria(categoria);
}

function ApriProdotto(){
    document.getElementById("scheda-prodotto").style.display= "flex";
}

function ChiudiProdotto(){
    document.getElementById("scheda-prodotto").style.display= "none";
}

function vaiAlCatalogo(){
    let nome = document.getElementById("input-nome").value;
    let categoria = document.getElementById("input-categoria").value;
    let prezzo = document.getElementById("input-prezzo").value;
    
    window.location.href = `catalogo.html?prezzo=${prezzo}&nome=${nome}&categoria=${categoria}`;
}

let limiteinferiorePrezzo;
let limitesuperiorePrezzo;

window.addEventListener("load", function () {
    
    if(window.location.href.includes("catalogo.html"))
    {
        let url = new URL(window.location.href);
        
        let prezzo = url.searchParams.get("prezzo");
        let nome = url.searchParams.get("nome");
        let categoria = url.searchParams.get("categoria");
        
        if(prezzo=="0-100"){
            limiteinferiorePrezzo=0;
            limitesuperiorePrezzo=100;
        } else if(prezzo=="100-200"){
            limiteinferiorePrezzo=100;
            limitesuperiorePrezzo=200;
        } else if(prezzo=="200-500"){
            limiteinferiorePrezzo=200;
            limitesuperiorePrezzo=500;
        } else if(prezzo=="500"){
            limiteinferiorePrezzo=500;
        }
        
        filtraProdottiCatalogo(nome,limiteinferiorePrezzo,limitesuperiorePrezzo,categoria);
    }
});



function filtraProdottiCatalogo(nome,limiteInferiore,limiteSuperiore,categoria){
    
    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
        
        console.log(limiteinferiorePrezzo);
        console.log(limitesuperiorePrezzo);
        console.log(nome);
        console.log(categoria);
        
        let prodotti = data;
        prodotti = data.filter((prodotto) => {
            
            
            if(limiteSuperiore != undefined && nome!="" && categoria!=""){
                return prodotto.price>=limiteInferiore && prodotto.price<limiteSuperiore && prodotto.title.startsWith(nome) && prodotto.category==categoria;
                console.log("Sono nel 1 if");}
                
                else if(limiteSuperiore==undefined && nome!="" && categoria!=""){
                    return prodotto.price>=limiteInferiore && prodotto.title.startsWith(nome) && prodotto.category==categoria;
                    console.log("Sono nel 2 if");}
                    
                    else if(limiteSuperiore==undefined && nome=="" && categoria!=""){
                        return prodotto.price>=limiteInferiore && prodotto.category==categoria;
                        console.log("Sono nel 3 if");}
                        
                        else if(limiteSuperiore==undefined && nome!="" && categoria==""){
                            return prodotto.price>=limiteInferiore && prodotto.title.startsWith(nome);
                            console.log("Sono nel 4 if");}
                            
                            else if(limiteSuperiore!=undefined && nome=="" && categoria==""){
                                return prodotto.price>=limiteInferiore && prodotto.price<limiteSuperiore && prodotto.category==categoria;
                                console.log("Sono nel 5 if");}

                                else if(limiteSuperiore==undefined && nome==undefined && categoria!=undefined){
                                    return prodotto.category==categoria;
                                    console.log("Sono nel 6 if");}
                            })
                            
                            for (let i = 0; i < prodotti.length; i++) {
                                let prodotto = prodotti[i];
                                
                                document.getElementById("container-card").innerHTML += (` 
                                <div class="col-sm-3" id="Card"> 
                                <div class="sezione-img-card">
                                <img style="width: 300px; height: 220px; object-fit: cover; border-top-left-radius: 50px; border-top-right-radius: 50px;" src="${prodotti[i].image}" alt="">
                                </div>
                                <div class="sezione-dati-card">
                                <h3 id="nome-prodotto" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;">${prodotti[i].title}</h3>
                                <p id="descrizione-prodotto" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;">${prodotti[i].description}</p>
                                <h6 id="prezzo-prodotto">${prodotti[i].price}</h6>
                                </div>
                                <button class="style-button-card" onclick="ApriProdotto()">Compra</button></div>`);}
                                
                            }).catch((error) => console.log(error));
                        }
                        
                        
                        
                        
                        
                        function filtraCategoria(categoria){
                            
                            fetch("https://fakestoreapi.com/products")
                            .then((response) => response.json())
                            .then((data) => {
                                
                                let prodotti = data;
                                prodotti = data.filter((prodotto) => {
                                
                                    
                                    {
                                        return prodotto.category==categoria;}
                                        
                                    })
                                    
                                    for (let i = 0; i < prodotti.length; i++) {
                                        let prodotto = prodotti[i];
                                        
                                        document.getElementById("container-card").innerHTML += (` 
                                        <div class="col-sm-3" id="Card"> 
                                        <div class="sezione-img-card">
                                        <img style="width: 300px; height: 220px; object-fit: cover; border-top-left-radius: 50px; border-top-right-radius: 50px;" src="${prodotti[i].image}" alt="">
                                        </div>
                                        <div class="sezione-dati-card">
                                        <h3 id="nome-prodotto" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;">${prodotti[i].title}</h3>
                                        <p id="descrizione-prodotto" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;">${prodotti[i].description}</p>
                                        <h6 id="prezzo-prodotto">${prodotti[i].price}</h6>
                                        </div>
                                        <button class="style-button-card">Compra</button></div>`);}
                                        
                                    }).catch((error) => console.log(error));
                                }