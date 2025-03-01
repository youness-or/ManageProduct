let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totale = document.getElementById("totale");
let count = document.getElementById("count");
let categorie = document.getElementById("categorie");
let create = document.getElementById("create");
let deleteeall= document.getElementById("deleteeall");
let serachmoood= document.getElementById("search");
let mood='create';
let tmp;




function gettotale() {
   if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    totale.innerHTML = result;
    totale.style.backgroundColor = "green";
   } 
   else {
    totale.innerHTML = "";
    totale.style.backgroundColor = "red";
   }
   
}
let dataProducte;

if (localStorage.getItem('producte')!=null ) {
    dataProducte = JSON.parse(localStorage.getItem('producte'));
}else{
    dataProducte = [];
}


create.onclick=function(){
    let newProducte = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totale:totale.innerHTML,
        count:count.value,
        categorie:categorie.value,
    }
    if (mood==='create') {
        if(newProducte.count>1){
        for (let index = 0; index < newProducte.count; index++) {
            dataProducte.push(newProducte); 
        }
         }
         else{
        dataProducte.push(newProducte); 
          }
    }
    else{
        dataProducte[tmp]=newProducte;
        mood='update';
        create.innerHTML='create';
        count.style.display="block";

    }

    
    localStorage.setItem('producte',JSON.stringify(dataProducte));
    console.log(dataProducte);
    cleardata();
    showdata();
    
    
}

function cleardata(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totale.innerHTML = "";
    count.value = "";
    categorie.value = "";
}

function showdata(){
    let table = '';
    for (let i = 0; i < dataProducte.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProducte[i].title}</td>
            <td>${dataProducte[i].price +' DH'}</td>
            <td>${dataProducte[i].taxes+' DH'}</td>
            <td>${dataProducte[i].ads+' DH'}</td>
            <td>${dataProducte[i].discount+' DH'}</td>
            <td>${dataProducte[i].totale +' DH'}</td>
            <td>${dataProducte[i].categorie}</td>
            <td><button onclick=" updatdata(${i})" id="update">Update</button></td>
            <td><button onclick=" deletee(${i})" id="delete">Delete</button></td>
        </tr>
        `
        deleteeall.innerText = `delete all (${dataProducte.length})`;
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totale.innerHTML = "";
    count.value = "";
    categorie.value = "";
}
    document.getElementById('tbody').innerHTML = table;
    showdeleteall();
    
}
showdata();


function deletee(i){
    
    dataProducte.splice(i,1);
    localStorage.setItem('producte',JSON.stringify(dataProducte));
    showdata();

}

function showdeleteall(){
    if(dataProducte.length>0){
        
        deleteeall.style.display="block"
    }
    else{
        deleteeall.style.display="none"
    }  
}
function Deleteeall(){
    localStorage.removeItem('producte');
    dataProducte.splice(0);
    showdata();
}
function updatdata(i){
    title.value =dataProducte[i].title;
    price.value = dataProducte[i].price ;
    totale.innerHTML = dataProducte[i].totale;
    taxes.value = dataProducte[i].taxes;
    ads.value = dataProducte[i].ads;
    discount.value = dataProducte[i].discount;
    totale.innerHTML = dataProducte[i].totale;
    count.style.display="none";
    categorie.value = dataProducte[i].categorie;
    create.innerHTML='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    });
    mood='update';
}

let search='title'
function searchmood(id) {
    if (id=='searchbytitle'){
        search='title';
        serachmoood.placeholder='search by title';
    }
    else{
        search= 'category';
        serachmoood.placeholder='search by categole';
    }
    serachmoood.focus();
}    

function searchdata(value){
    let table = '';
    if (search=='title')  {
        for (let i = 0; i < dataProducte.length; i++) {
            if (dataProducte[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProducte[i].title}</td>
                    <td>${dataProducte[i].price +' DH'}</td>
                    <td>${dataProducte[i].taxes+' DH'}</td>
                    <td>${dataProducte[i].ads+' DH'}</td>
                    <td>${dataProducte[i].discount+' DH'}</td>
                    <td>${dataProducte[i].totale +' DH'}</td>
                    <td>${dataProducte[i].categorie}</td>
                    <td><button onclick=" updatdata(${i})" id="update">Update</button></td>
                    <td><button onclick=" deletee(${i})" id="delete">Delete</button></td>
                </tr>
                `
            }
            
        }
        

        
       
    
    }
    else{
        for (let i = 0; i < dataProducte.length; i++) {
            if (dataProducte[i].categorie.includes(value)) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProducte[i].title}</td>
                    <td>${dataProducte[i].price +' DH'}</td>
                    <td>${dataProducte[i].taxes+' DH'}</td>
                    <td>${dataProducte[i].ads+' DH'}</td>
                    <td>${dataProducte[i].discount+' DH'}</td>
                    <td>${dataProducte[i].totale +' DH'}</td>
                    <td>${dataProducte[i].categorie}</td>
                    <td><button onclick=" updatdata(${i})" id="update">Update</button></td>
                    <td><button onclick=" deletee(${i})" id="delete">Delete</button></td>
                </tr>
                `
            }
        
        }
        


    }
    document.getElementById('tbody').innerHTML = table;
    
    
}    