
export function fetchCountries(name) {

    const url = `https://restcountries.com/v3.1/name/`;

 const fields = '?fields=name,capital,population,flags,languages'
   return  fetch(`${url}${name}${fields}`)
        .then(
        (response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
    
            })
    


//    .catch( (error => {
//             console.log("Oops, there is no country with that name")
//             return error;
        
//         })
        .catch(error => console.log(error));
}
