const load = () => {
    fetch("https://cloth-store-backend-api.vercel.app/shop/product/")
        .then((res) => res.json())
        .then((data) => {
            admin_product(data);

        });
};




const admin_product = (data) => {
    console.log(data)
    console.log('data')

    data.forEach((product) => {
        
        const parent = document.getElementById("admin_cards");
        const div = document.createElement("div");
   
 
        div.innerHTML = `
              <img src="${product.image_url}" class="dyimg" alt="${product.name}">
              <div class="card-body">
                <div>
                         <h3 class="flex-grow-1 h5">${product.name}</h3>
                          <h3 class="flex-grow-1 h5 text-danger">${product.rating}</h3>
                         <p class="px-2">${product.price} $</p>
                     </div>
                     <div class="button d-flex">  
                    ${token ? `<a href="product_details.html?productId=${product.id}" class="btn btn-success btn-sm">Details</a>` : ''}
                        <a href="wishlist.html" class="add-to-wishlist">
                             <img src="images/heart2.png" alt="Wishlist" height="40px" width="40px">
                        </a> 
                      </div>
                 </div>
              `;
        parent.appendChild(div);
    });
};
load();