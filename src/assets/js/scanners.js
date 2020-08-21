// Website details
addScanner((obj) => {
  console.log(obj);
  setTitle(obj.title || "--");
  setDescription(obj.meta.description || "--");
  setFavicon((obj.imports.favicon ? obj.imports.favicon.href : ""));
})

// Metadata
addScanner((obj) => {
  setAuthor(obj.meta.author || "--");
  setCharset(obj.meta.charset || "--");
  setRobots(obj.meta.robots || "--");
  setViewport(obj.meta.viewport || "--");
});

// Keywords
addScanner((obj) => {
  for (let kw of obj.meta.keywords || []) {
    addKeyword(kw);
  }
});

// Title
addScanner((obj) => {
    if (obj.title == null || obj.title == "")
      return addError("Title is misconfigured", "You can setup a title on your page with <b>title</b> tag.")

    else if (obj.title.length > 72 || obj.title.length < 20)
      return addWarn("Title length is not recommended", "It is recommended that the website title contain between 20 to 72 characters.")

    else
      addSuccess("Title is perfect", "your title contains " + obj.title.length  + " characters and is within the recommendations.")
});

// Content H1
addScanner((obj) => {
  if (obj.content.h1.length == 0)
    return addError("No header", "It is recommended to have at least one H1 tag.");
  
  if (obj.content.h1.length > 1)
    addWarn("More than one header", "It is recommended to only have one h1 tag on the entire page.")
  
  if (obj.content.h1[0].length < 20 || obj.content.h1[0].length > 60)
    addWarn("Header length is not recommended", "It is recommended that the website H1 contain between 20 to 60 characters.");
  
  else if (obj.content.h1.length == 1)
    addSuccess("Header is perfect", "Your website contains an H1 and is perfectly sized. (" + obj.content.h1[0].length + " characters)")
});

// Content length
addScanner((obj) => {
  let length = obj.content.words.length;
  if (length < 250) {
    addWarn("Website with little content", "Ideally, a website has at least a total of more than 250 words and 1000 as recommended.")
  } else if (length < 1000) {
    addSuccess("Website content is perfect", "The website has a total of " + length + " words, although it is within the recommendations, we advise you to use 1000 to appear first in the search results.")
  } else {
    addSuccess("Website content is perfect", "The website has more than 1000 words, in total it has " + length + " words and is within the recommendations.");
  }
})

// Meta check
addScanner((obj) => {
  let meta = obj.meta;
  
  if (obj.imports.favicon == null) {
    addError("Favicon is misconfigured", "The website does not contain any favicon");
  }
  
  if (meta.description == null) {
    addError("Description is misconfigured", "The website does not contain any description");
  }
  
  if (meta.keywords == null || meta.keywords.length == 0) {
    addError("Keywords is misconfigured", "The website does not contain any keywords");
  }
}); 

// Image check
addScanner((obj) => {
  let list = obj.media.images;
  let noalt = [];
  let lazy = [];
  
  for (let item of list) {
    if (item.alt == undefined || item.alt == null)
      noalt.push(item.src);
    if (item.loading == undefined || item.loading == null || item.loading.toLowerCase() != "lazy")
      lazy.push(item.src);
  }
  
  if (noalt.length != 0) {
    addWarn("Images without alt", "it is recommended that all images have an \"alt\" attribute. Currently there are " + noalt.length + " images without this attribute.")
  }
  
  if (lazy.length != 0) {
    addWarn("Images without lazy loading", "To improve the performance and loading times of the website, it is preferable that the images have lazy-loading enabled. Currently there are " + lazy.length + " images without lazy-loding");
  } 
  
  if (noalt.length == 0 && lazy.length == 0) {
    addSuccess("Images are perfect", "All images on the website have lazy-loading enabled and also contain an \"alt\" attribute")
  }
});

// Imports Check
addScanner((obj) => {
  let imports = obj.imports;
  
  if (imports.styles.length > 8) {
    addError("Too styles imports", "Too many imports to the website can seriously decrease performance, try to use minimally less than 8. (You currently have " + imports.styles.length  + " style imports)");
  } else if (imports.styleslength > 3) {
    addWarn("Too styles imports", "Too many imports to the website can seriously decrease performance, It is recommended to import a maximum of 3. (You currently have " + imports.styles.length  + " style imports)");
  }
  
  if (imports.scripts.length > 8) {
    addError("Too script imports", "Too many imports to the website can seriously decrease performance, try to use minimally less than 8. (You currently have " + imports.scripts.length  + " script imports)");
  } else if (imports.scripts.length > 3) {
    addWarn("Too script imports", "Too many imports to the website can seriously decrease performance, It is recommended to import a maximum of 3. (You currently have " + imports.scripts.length  + " script imports)");
  }
  
  if (imports.scripts.length <= 3 && imports.styles.length <= 3) {
    addSuccess("Imports are perfect", "There are few script and style imports. (" + imports.scripts.length + " scripts, " + imports.styles.length + " styles)")
  }
});

/* Keyworld relative to content Check */
addScanner((obj) => {
  let kws = obj.meta.keywords || [];
  let content = (obj.content.text || "").toLowerCase();
  
  let words = [];
  
  for (let kw of kws) {
    if (!content.includes(kw.toLowerCase())) {
      words.push(kw);
    }
  }
  
  if (words.length == 0 && kws.length > 0) {
    addSuccess("Keywords are relative", "Keywords are related to the content of the website.")
  } else if (kws.length > 0) {
    addWarn("Keywords are not relative", "The following keywords are not related to the content of the website: <br/>" + words.join(", "));
  }
});