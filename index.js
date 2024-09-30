const ApiUrl = "https://api.ecommerce.com/products";

const min_price = 0;
const max_price = 100000;
let new_min_price = 0;
let new_max_price = 100000;
count = 1000;

"Defining a function that returns me an interval of products with maximum and minimum price."
async function fetch_products(min_price, max_price) {
    const params = new URLSearchParams({
        "minPrice": min_price,
        "maxPrice": max_price
    });

    "fetching api data and creating json a variable "
    const response = await fetch(`${ApiUrl}?${params.toString()}`);
    return await response.json();
}

"Defining a function where i am shifting intervals accordin to count and total numbers comparison."
"I am using a new maximum and minimum price that is being manipulated, but my max and min constant remains the same."
"The problem is being solved through while loop, everytime "
async function main() {
    let data = await fetch_products(new_min_price, new_max_price);
    let total = parseInt(data["total"]);

    "Defining when I want my while loop to end (when the total products in the maximum" 
    "range match the lenght of products pushed into my products array), also converting that variable into integer so i can compare it. "
    let products = [];
    const end_data = await fetch_products(new_min_price, new_max_price);
    const end = parseInt(end_data["total"]);

    "In the while loop, everytime the total number of products available in the interval is greater than 1000, the maximum range is decreased by half."
    "When the interval is finally smaller than 1000 it pushes the data into products array and increases the minimum price at the level of the last new_maximum price,"
    "the process is then repeated whith the constant maximum price value. the function returns array of producst as aresult. "
    while (products.length < end) {
       let data = await fetch_products(new_min_price, new_max_price);
    
        if (total > count) {
            new_max_price = (new_min_price + new_max_price) / 2;
        } else{
            products.push(data["products"]);
            new_min_price = new_max_price;
            new_max_price = max_price;
        }
    }            
    return products;
}
