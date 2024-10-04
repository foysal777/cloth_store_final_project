const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("productId");

    fetch(`https://cloth-store-backend-api.vercel.app/shop/product/${param}`)
        .then((res) => res.json())
        .then((data) =>
            display_details(data)
        );


};



const display_details = (product) => {
    console.log(product);
    const parent = document.getElementById("details");
    parent.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("div_containers", "d-flex", "flex-column", "flex-lg-row");
    div.innerHTML = `              
        <div class="photo_div col-12 col-sm-12 col-lg-5">
            <img class="myphoto img-fluid" src="${product.image_url}" alt="not found" height="450px">
        </div>

        <div class="pro_details col-12 col-sm-12 col-lg-7">
            <h2 class="text-left text-danger"><u>Fabrics Details Info</u></h2>
            <div class="card_bodyss">
                <div class="">
                    <h3 class="text-primary">Name: ${product.name}</h3>
                    <h4 class="text-danger">Review: ${product.rating}</h4>
                    <h3>Description: ${product.description}</h3>
                    <h3 class="text-danger">Price: $${product.price}</h3>
                    <h4>Size: ${product.size}</h4>
                    <h4 class="text-success" >Color: ${product.color}</h4>
                </div>
                <a onclick="add_to_cart('${product.name}', '${product.image_url}', '${product.price}', this)" class="btn btn-danger mt-3">Add to Cart</a>
            </div>
        </div>
    `;
    parent.appendChild(div);
};



// Review Part *************




const load_review = () => {
    fetch("https://cloth-store-backend-api.vercel.app/shop/Review/")
        .then((res) => res.json())
        .then((data) => display_review(data))
        .catch((err) => console.log(err));

};


const display_review = (reviews) => {
    console.log(reviews)
    reviews.forEach((review) => {
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
          <p class="text-danger" > Review : ${review.comment.slice(0, 50)}  </p> 
          </div>
      </li>
    `;

        parent.appendChild(li)

    });
};

// add to cart  part
const add_to_cart = (name, image_url, price) => {
    const product = { name, image_url, price };

   console.log(product)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];



    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "add_cart.html";
};

const load_cart = () => {
    const container = document.getElementById("add_cart");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const div = document.createElement("div");
        div.classList.add("div_class1");
        div.innerHTML = `
            <div class="card row " style="width: 10rem; ">
                <img src="${product.image_url}" class="card_img" alt="...">
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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
};


window.onload = load_cart;



// for Review 


document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and display the average rating
    function fetchAverageRating() {
        fetch('https://cloth-store-backend-api.vercel.app/shop/average_rating/')
            .then(response => response.json())
            .then(data => {
                const avgRatingContainer = document.getElementById('average-rating');
                avgRatingContainer.innerHTML = `<p class = text-danger display-2 >Average Rating: <strong>${data.average_rating.toFixed(2)}</strong> stars</p>`;
            })
            .catch(error => console.error('Error fetching average rating:', error));
    }


    // store 

    function fetchReviews() {
        fetch('https://cloth-store-backend-api.vercel.app/shop/userreviews/')
            .then(response => response.json())
            .then(data => {
                const reviewsContainer = document.getElementById('reviews-container');
                reviewsContainer.innerHTML = '<h2 class=text-danger >Recent Reviews</h2>';
                data.forEach(review => {
                    const newReview = `
            
                <div class="review mt-3 border border-2 border-danger p-3">
                    <p>Name: <strong>${review.name}</strong> <br> Rating: <strong class = text-danger>${review.star_rating}</strong> stars</p> 
                   comment:<p class = text-danger>${review.comment}</p>
                </div>
            `;
                    reviewsContainer.innerHTML += newReview;
                });
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }

    // Fetch and display the average rating and reviews on page load
    fetchAverageRating();
    fetchReviews();







    // Handle form submission
    document.getElementById('review-form').addEventListener('submit', function (event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let starRating = document.getElementById('star-rating').value;
        let comment = document.getElementById('comment').value;

        let csrftoken = getCookie('csrftoken');

        fetch('https://cloth-store-backend-api.vercel.app/shop/userreviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                name: name,
                star_rating: starRating,
                comment: comment
            })
        })
            .then(response => response.json())
            .then(data => {
                let reviewContainer = document.getElementById('reviews-container');
                let newReview = `
                <div class="review mt-3">
                    <p>Name: <strong>${data.name}</strong> <br> Rating: <strong class=text-danger > ${data.star_rating}</strong> stars</p> <br>
                    <p>${data.comment}</p>
                </div>
            `;
                reviewContainer.innerHTML += newReview;
                document.getElementById('review-form').reset();

                // Fetch and update the average rating
                fetchAverageRating();
            })
            .catch(error => console.error('Error:', error));
    });

    // cokkies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});


load_review();
getparams();