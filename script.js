// HTML section

// 1. Header

let header = document.createElement("header");
header.innerHTML=`
        <div class="outerheadercontainer">
            <div class="imgheader">
                <img class="headerlogo" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Logo of pokeAPI">
            </div>
            <h1 class="headerheading">"The Restful Pokemon API"</h1>
            <div><label for="">Search for your favourite pokemon</label></div>
            <input type="text"  placeholder="Enter the pokemon name here" onkeyup="search()">
        </div>
`
document.body.append(header);



// 2. Main body 

let sectionofbody = document.createElement("section");
sectionofbody.setAttribute("class", "mainparent");
document.body.append(sectionofbody);







// Actual logic

let url = "https://pokeapi.co/api/v2/pokemon";

async function basic(){
    try{
        let res = await fetch(`${url}?limit=50`);
        let result = await res.json();
        let finres = result.results;
        console.log(finres);
        for(obj of finres){
            advance(obj)
        }
    }catch(error){
        console.log("There is some error with basic function");
        console.log(error);
    }
}

basic()








async function advance(obj){
    try{
        let pokename = obj.name;
        let res1 =await fetch(`${url}/${pokename}`);
        let result1 = await res1.json();
        // console.log(result1);
        let id = result1.id;
        let imageurl = result1.sprites.back_default;
        let abilities = [result1.abilities[0].ability.name, result1.abilities[1].ability.name];
        let moves = [result1.moves[0].move.name, result1.moves[1].move.name, result1.moves[2].move.name];
        let weight = result1.weight;
        console.log(pokename, id, imageurl, abilities, moves);
        let firstdiv = document.createElement("div")
        firstdiv.setAttribute("class","outerdiv");
        firstdiv.innerHTML=`
        <img class="pokeimg" src= ${imageurl}>
        <p><strong>Id:</strong> #${id}</p>
        <p><strong>Name:</strong> ${pokename}</p>
        <p><strong>Abilities:</strong></p>
        <ul>
            <li>${abilities[0]}</li>
            <li>${abilities[1]}</li>
        </ul>
        <p><strong>Moves:</strong></p>
        <ul>
            <li>${moves[0]}</li>
            <li>${moves[1]}</li>
            <li>${moves[2]}</li>
        </ul> 
        <p><strong>Weight:</strong> ${weight}
        `
        document.querySelector(".mainparent").append(firstdiv);

    }catch(error){
        console.log("There is some error with advance function");
        console.log(error);
    }
}


  









// search functionality

async function search(){
    try{
        let value = document.querySelector("input").value;
        let res = await fetch(`${url}?limit=50`);
        let result = await res.json();
        let finres = result.results;
        console.log(finres);
        for(obj of finres){
            let parameter = obj.name;
            if(parameter.includes(value)){
                document.querySelector(".mainparent").innerHTML="";
                advance(obj)
            }else{
                continue
            }
        }
    }catch(error){
        console.log("There is some error with basic function");
        console.log(error);
    }
}