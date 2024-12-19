// tax Calculation
    
let taxBtn = document.querySelector('.taxSwitch input');
    taxBtn.addEventListener('click',()=>{
        
    let listingsPrice = document.querySelectorAll('.listingPrice p span');
        
        for (const price of listingsPrice) {
            let taxInfo = price.nextElementSibling;
            let listingRate = Number(price.getAttribute('value'));
    

            if(!taxInfo.style.visibility)
            {
            taxInfo.style.visibility = "visible";
            let tax = listingRate * 10 /100;
            price.innerText =(listingRate + tax).toFixed(0);
            } else
            {
                taxInfo.style.visibility = "";
                price.innerText = listingRate;
            }
        }
    
    })

    // filter Category
   
    let category = document.querySelectorAll('.filter');
    let flexContainer = document.querySelector('.flex-container');
    
    for (const cate of category) {
       let categoryName = cate.children[1].innerText.trim();
       
       cate.addEventListener('click',()=>{
        
        //send get req to backend
       fetchCategorydata(categoryName);
       
       })
    }

    // function for fetch category data
    let fetchCategorydata = async(categoryName)=>{
        let allListings = await fetch(`/?category=${categoryName}`);
         listing = await allListings.json();

         // clear home page
         flexContainer.innerHTML = '';
         
         // add listings
         for (const list of listing) {
              let listingsHtml = `<a class="m-3 pl-3 card listing-card" href="listing/show/${list._id}">
              <img src="${list.image.path}" class="card-img-top">
              <div class="card-body" >
              <h5 class="card-title">${list.title}</h5>
              <p class="card-text listingDec">${list.description}</p>
              <div class="listingPrice">
                  <p class="card-text">&dollar; <span value="${list.price}">${list.price}</span>/night <i> applied 10% Tax.</i></p>
              </div>
              </div>
          </a>`;

          flexContainer.innerHTML = flexContainer.innerHTML + listingsHtml;
         }
      };