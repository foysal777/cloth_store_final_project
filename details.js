const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("productId");
 
    fetch(`https://cloth-store-project-backend-api.onrender.com/shop/product/${param}`)
      .then((res) => res.json())
      .then((data) => display_details(data));
  
   
  };

  const display_details = (product) => {
          console.log(product);
        const parent = document.getElementById("details");
        parent.innerHTML = "";
        const div = document.createElement("div");
        div.classList.add("div_containers", "d-flex");
        div.innerHTML = `              
            <div class="photo_div col-lg-6 ">
                <img class ="myphoto" src="${product.image} " alt="not fond" height="450px">
            </div>

            <div class="text col-lg-6  w-100 ">
                  <h2 class="text-center text-danger"> <u>Frabics Details info</u> </h2>
                <div class="card_bodyss  w-100  ">
                    <div class="">
                        <h3 class="text-primary">Name : ${product.name} </h3>
                        <h4 class=" text-danger"> Review : ${product.rating} </h4>
                        <h4>Description :${product.description} </h4>
                        <h3 class="text-danger">  Price :${product.price}$</h3>
                        <h4 class=""> Size : ${product.size} </h4>
                        <h4 class=""> Color : ${product.color}</h4>
                    </div>
                    <a  onclick="add_to_cart('${product.name}', '${product.image}', '${product.price}', this)" class="btn btn-danger">Add to Cart</a>

                </div>
            </div>
       
       `;
        parent.appendChild(div);

    };

// Review Part *************

const load_review = ()  => {
    fetch("https://cloth-store-project-backend-api.onrender.com/shop/Review/")
    .then((res) => res.json())
    .then((data) => display_review(data))
    .catch((err) => console.log(err));

};


const display_review = (reviews)=>{
    console.log(reviews)
    reviews.forEach((review) =>{
    const parent = document.getElementById('review_containerd');
    const li = document.createElement("li");
    li.classList.add("slide-visible");
    li.innerHTML = 
     `
      <li class= "slide-visible" > 
      <div class="review_card">
         <img class="review_img" src="${review.image} " alt="not found"> <br><br>
          <h3 class="text-success"> Reviewer:  ${review.user} </h3>
          <h3 class="text-danger" >  ${review.rating}</h3>
          <p>  ${review.product} </p>
          <p class="text-danger" > Review : ${review.comment.slice(0,50)}  </p> 
          </div>
      </li>
    `;
    
    parent.appendChild(li)
  
    });
  };
  
// add to cart  part
const add_to_cart = (name, image, price) => {
    const product = { name, image, price };
    

    let cart = JSON.parse(localStorage.getItem("cart")) ;
    
    if(cart =! null) {

        cart.push(product);
    }else {

         cart =[];
    }

   
   
    localStorage.setItem("cart", JSON.stringify(cart));
 
    window.location.href = "add_cart.html";
};

const load_cart = () => {
    const container = document.getElementById("add_cart");
    const cart = JSON.parse(localStorage.getItem("cart")) ;
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("div_class1");
        div.innerHTML = `
            <div class="card row " style="width: 10rem; ">
                <img src="${product.image}" class="card_img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h5 class="card-title">${product.price}</h5>
                    <a href="#" class="btn btn-success btn-sm">Already Carted</a> <br>

                    <button class="btn btn-danger remove-btn btn-sm " data-index="${index}">Remove</button>
                </div>
            </div>
        `;

        container.appendChild(div);
        totalPrice += parseFloat(product.price);
    });

    // Display total price
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-price", "m-3");
    totalDiv.innerHTML = `<h3 class="text-danger fw-bold border border-danger">Total Price : $${totalPrice.toFixed(2)}</h3>`;
    container.appendChild(totalDiv);

    // Add  to remove buttons
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            removeFromCart(index);
           
            container.innerHTML = "";
            load_cart();
        });
    });
};

const removeFromCart = (index) => {
    let cart = JSON.parse(localStorage.getItem("cart")) ;
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));
};


window.onload = load_cart;


load_review();
  getparams();