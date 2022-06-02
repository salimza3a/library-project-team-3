

let getCatalogNames = database.ref('/categories');


getCatalogNames.on("value", function(catalog) {
    let data = catalog.val();
    let catalogItems = document.getElementById("catalog-items");
      Object.values(data).map(item => {
       let newAnchorTag = document.createElement('a');
       newAnchorTag.setAttribute("href", "./catalog.html")
       let newDiv =  document.createElement("div");
       newDiv.setAttribute("class", "catalog");
        newAnchorTag.append(newDiv)
       newDiv.textContent = item.catalog_name

       catalogItems.append(newAnchorTag)
     
       
   } )


 
  
    
})

