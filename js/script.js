
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var userNameAlert = document.getElementById("userNameAlert"); 
var productsContainer ;

function validateProductName()
{
    var regax = /^[A-Z][a-z]{3,8}$/; //Regular Expression

    if(regax.test(productNameInput.value) == true)
    {
       productNameInput.classList.add("is-valid");
       productNameInput.classList.remove("is-invalid");
       userNameAlert.classList.replace("d-block" , "d-none");

       return true;
    }
    else
    {
        userNameAlert.classList.replace("d-none" , "d-block")
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");

        return false;
    }
    
}

productNameInput.addEventListener("keyup" , validateProductName)




if(localStorage.getItem("myproducts") == null) //zbon gdid mlo4 7aga adima 
{
    productsContainer = [];
}
else //zbon adim 
{
    productsContainer = JSON.parse(localStorage.getItem("myproducts"));
    dispalyProducts();
}

function addProduct()
{

    if(validateProductName() == true)
    {
        var product = 
        {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            desc : productDescInput.value,
        }
        productsContainer.push(product);
        localStorage.setItem("myproducts" , JSON.stringify(productsContainer));
        dispalyProducts();
        clearForm();
        console.log(productsContainer);
    }

}

function clearForm ()
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";  
    productDescInput.value = "";
}

function dispalyProducts ()
{
    var cartoona = ``;
    for(var i =0 ; i < productsContainer.length ; i++)
    {
        cartoona += `
        <tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick="changeFormForUpdate(${i})" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td> 
        </tr>`;
    }
    document.getElementById("tableData").innerHTML = cartoona ;
}

function deleteProduct (productIndex)
{
    productsContainer.splice(productIndex,1);
    localStorage.setItem("myproducts" , JSON.stringify(productsContainer));
    dispalyProducts();
}

function searchProducts(searchTerm)
{
    var cartoona =``;
    for(var i = 0 ; i <productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
        {
            cartoona += `
            <tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><button onclick="changeFormForUpdate(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td> 
            </tr>`;
        }
        
    }
    document.getElementById("tableData").innerHTML = cartoona ;
}

function changeFormForUpdate(productIndex)
{
    productNameInput.value = productsContainer[productIndex].name;
    productPriceInput.value = productsContainer[productIndex].price;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescInput.value = productsContainer[productIndex].desc;


    document.getElementById("mainBtn").innerHTML = "Update Product";

}