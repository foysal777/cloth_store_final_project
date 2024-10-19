


const load_post = () => {

    const token = localStorage.getItem('token');
    fetch("https://cloth-store-backend-api.vercel.app/shop/product/", {
        // method: 'GET',
        // headers: {
        //     Authorization: `Token ${token}`,
        //     "Content-Type": "application/json",
        // },


    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            admin_product(data);
        });
};


const admin_product = (data) => {
    console.log(data)
    console.log('data')

    data.forEach((product) => {

        const parent = document.getElementById("admin_cards");
        const div = document.createElement("div");
        div.classList.add("card", "border-0");
        div.style.width = "18rem";

        div.innerHTML = `
              <img src="${product.image_url}" class="dyimg" alt="${product.name}">
              <div class="card-body">
                <div>
                         <h3 class="flex-grow-1 h5">Product Name : ${product.name}</h3>
                          <h3 class="flex-grow-1 h5 text-danger"> Rating : ${product.rating} star</h3>
                         <p class="px-2">${product.price} $</p>
                     </div>
                          <button class="delete-btn btn-success">Delete</button>
                 </div>
              `;
        parent.appendChild(div);


        const deleteBtn = div.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
     
            alert('Delete Complete');
            
            
            div.remove();

        });

    });
};



load_post();


// const display_product = (products) => {
//     const parent = document.getElementById("card_contain"); // Get the parent container where the cards will be displayed
//     // Clear the parent container to avoid duplicating products
//     parent.innerHTML = "";
//     products.forEach((product) => {
//         // Create a new div element for each product card
//         const div = document.createElement("div");
//         div.classList.add("card", "container", "border-0");
//         div.style.width = "18rem"; // Set the card width
//         // Set the inner HTML for each product card
//         div.innerHTML = `
//            <div class="card-container" style="width: 18rem;" data-id="${result.id}">
//                         <img src="${imageUrl}" class="card-img-top" alt="${productName}">
//                         <div class="card-body">
//                             <div class="">
//                                 <h3 class="flex-grow-1 h5">${productName}</h3>
//                                 <h3 class="flex-grow-1 h5 text-danger">${"★".repeat(productRating)}${"☆".repeat(5 - productRating)}</h3>
//                                 <p class="px-2">$${productPrice}</p>
//                             </div>
//                             <a href="#" class="btn btn-primary delete-btn">Delete</a>
//                         </div>
//                     </div>`;
//         // Append the card div to the parent container
//         parent.appendChild(div);
//     });
// };