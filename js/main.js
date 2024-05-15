

var productName = document.getElementById( 'productName' );
var productPrice = document.getElementById( 'productPrice' );
var productCate = document.getElementById( 'productCate' );
var productDesc = document.getElementById( 'productDesc' );
var submitBtn = document.getElementById( 'submitBtn' );
var inputs = document.getElementsByClassName( 'form-control' );
var searchProduct = document.getElementById( 'search' );
var errorAlert = document.getElementById( "error" );
var productContainer = [];
var currentIndex;

productName.onkeyup = function ()
{
  var nameRegx = /^[A-Z][a-z]{2,8}$/;
  if ( !nameRegx.test( productName.value ) )
  {
    submitBtn.disabled = 'true';
    productName.classList.add( 'is-invalid' );
    productName.classList.remove( 'is-valid' );
    errorAlert.classList.remove( "d-none" );
  } else
  {
    submitBtn.removeAttribute( 'disabled' );
    productName.classList.add( 'is-valid' );
    productName.classList.remove( 'is-invalid' );
    errorAlert.classList.add( "d-none" );
  }

};

if ( JSON.parse( localStorage.getItem( 'productList' ) ) != null )
{
  productContainer = JSON.parse( localStorage.getItem( 'productList' ) );
  showProduct();
}

submitBtn.onclick = function ()
{
  if ( submitBtn.innerHTML == "addProduct" )
  {
    addProduct();
  }
  else
  {
    updateProduct();
  }
  showProduct();
  clearForm();
};


function addProduct ()
{
  if ( validateProductName() == true )
  {
    var product = {
      name: productName.value,
      price: productPrice.value,
      cate: productCate.value,
      desc: productDesc.value
    };
    // var product = {
    //   name: productName.value,
    //   price: productPrice.value,
    //   cate: productCate.value,
    //   desc: productDesc.value
    // };
    productContainer.push( product );
    localStorage.setItem( 'productList', JSON.stringify( productContainer ) );
    productName.classList.remove( 'is-valid' );
    submitBtn.disabled = 'true';
  }
}

function showProduct ()
{
  cartoona = ``;
  for ( var i = 0; i < productContainer.length; i++ )
  {
    cartoona += `<tr>
    <td>${ i + 1 }</td>
    <td>${ productContainer[ i ].name }</td>
    <td>${ productContainer[ i ].price }</td>
    <td>${ productContainer[ i ].cate }</td>
    <td>${ productContainer[ i ].desc }</td>
    <td><button onclick="deleteProduct(${ i })" class="btn btn-outline-danger">Delete</button></td>
    <td><button onclick="getProductInfo(${ i })" class="btn btn-outline-warning">Update</button></td>
    </tr>`;
  }
  document.getElementById( 'my-table' ).innerHTML = cartoona;
}

function clearForm ()
{
  for ( var i = 0; i < inputs.length; i++ )
  {
    inputs[ i ].value = '';
  }
}

searchProduct.onkeyup = function ()
{
  cartoona = ``;
  var value = searchProduct.value;
  for ( var i = 0; i < productContainer.length; i++ )
  {
    if ( productContainer[ i ].name.toLowerCase().includes( value.toLowerCase() ) )
    {
      cartoona += `<tr>
      <td>${ i + 1 }</td>
      <td>${ productContainer[ i ].name }</td>
      <td>${ productContainer[ i ].price }</td>
      <td>${ productContainer[ i ].cate }</td>
      <td>${ productContainer[ i ].desc }</td>
      <td><button class="btn btn-outline-danger">Delete</button></td>
      <td><button class="btn btn-outline-warning">Update</button></td>
      </tr>`;
    }
  }
  document.getElementById( 'my-table' ).innerHTML = cartoona;
};


function deleteProduct ( index )
{
  productContainer.splice( index, 1 );
  localStorage.setItem( 'productList', JSON.stringify( productContainer ) );
  showProduct();
}

function getProductInfo ( index )
{
  productName.value = productContainer[ index ].name;
  productPrice.value = productContainer[ index ].price;
  productCate.value = productContainer[ index ].cate;
  productDesc.value = productContainer[ index ].desc;
  submitBtn.innerHTML = "UpdateProduct";
  submitBtn.classList.replace( 'btn-outline-dark', 'btn-outline-warning' );
  currentIndex = index;
  submitBtn.removeAttribute( 'disabled' );
}

function updateProduct ()
{
  var product = {
    name: productName.value,
    price: productPrice.value,
    cate: productCate.value,
    desc: productDesc.value
  };
  productContainer[ currentIndex ] = product;
  productName.classList.remove( 'is-valid' );
  submitBtn.disabled = 'true';
  localStorage.setItem( 'productList', JSON.stringify( productContainer ) );
  submitBtn.innerHTML = "addProduct";
  submitBtn.classList.replace( 'btn-outline-warning', 'btn-outline-dark' );
}


function validateProductName ()
{
  var nameRegx = /^[A-Z][a-z]{2,8}$/;
  if ( nameRegx.test( productName.value ) == true )
  {
    // submitBtn.disabled = 'true'
    productName.classList.add( 'is-valid' );
    productName.classList.remove( 'is-invalid' );
    errorAlert.classList.add('d-none')
    return true;
  } else
  {
    // submitBtn.removeAttribute( 'disabled' );
    productName.classList.add( 'is-invalid' );
    productName.classList.remove( 'is-valid' );
    errorAlert.classList.remove( 'd-none' );
    return false;
  }
}
