let search = document.createElement("div");
search.className = "search-div"
search.innerHTML +=`
<form id="form">
<input type="text" id="text-search" class="text-search" placeholder="Search Brewery Name">
</form>`;
document.body.appendChild(search);

let inputSearch = document.querySelector(".text-search");
inputSearch.addEventListener("keyup", check);

function check(){
    let searchBox = document.querySelector("#text-search").value.toUpperCase();
    let container = document.querySelector(".cont");
    let card = document.querySelectorAll(".data");
    let search1 = document.getElementsByTagName("h2");

    for(var i=0; i<search1.length; i++){
        let match = card[i].getElementsByTagName("h2")[0];

        if(match){
            let textVal = match.innerHTML || match.textContent;
            if(textVal.toUpperCase().indexOf(searchBox)>-1){
                card[i].style.display = "";
            }
            else{
                card[i].style.display = "none";
            }
        }
    
    }
}

let inp = document.createElement("div");
inp.className = "cont"
document.body.appendChild(inp);
async function show(){
    try{
        let response = await fetch("https://api.openbrewerydb.org/v1/breweries/");
        let data = await response.json();
        console.log(data)
        data.forEach((arr, ind)=>{
            let obj = {
                ...arr,
                ind: ind,
                brewery_name: arr.name,
                brewery_type: arr.brewery_type,
                address: arr.address_1,
                website: arr.website_url,
                phone: arr.phone
            }
            if(obj.brewery_name == null || undefined ){
                obj.brewery_name = "Not Found";
            }
            if(obj.brewery_type == null || undefined){
                obj.brewery_type = "Not Found";
            }
            if(obj.address == null || undefined){
                obj.address = "Address Not Available";
            }
            if(obj.website == null || undefined){
                obj.website = "website not available";
            }
            if(obj.phone == null || undefined){
                obj.phone = "phone number not available";
            }
            display(obj);
        })
    }
    catch(er){
        err = document.createElement("div");
        err.style.fontSize = "30px"
        err.style.margin= "0px suto";
        err.style.textAlign = "center";
        err.style.padding = "50px";
        err.textContent = er.message;
        err.style.color="red";
        err.style.border= "2px solid lightblue";
        err.style.backgroundColor="yellow";
        // console.log(er)
        div = document.querySelector(".search-div");
        div.style.display = "none";
        document.body.appendChild(err);
    }
}
show();

function display(obj){
    console.log(obj.ind);
    console.log(obj.brewery_name);
    console.log(obj.brewery_type);
    console.log(obj.address);
    console.log(obj.website);
    console.log(obj.phone);

    inp.innerHTML +=`
    <div class="data" id="data">
    <div class="left">
    <h2 class="name">${obj.brewery_name}</h2>
    </div>
    <div class="right">
    
    <h3 class="type"><span>Type: </span>${obj.brewery_type}</h3>
    <p class="para">Address: ${obj.address}</p>
    <div class="page">
    <a class="website" href=${obj.website} target="_blank">WEBSITE</a>
    </div>
    <p class="number">Phone: ${obj.phone}</p>
    </div>
    </div>`;

}