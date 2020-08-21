function addKeyword (keyword) {
    let counter = utils.getObj("kw-counter");
    counter.innerHTML = parseInt(counter.innerHTML) + 1;

    utils.addInner("kw-list", `<span class="keyword">${keyword}</span>`);
}

function setTitle (title) {
    utils.setInner("wb-title", title);
}

function setUrl (url) {
    utils.setInner("wb-url", url);
}

function setDescription (description) {
    utils.setInner("wb-desc", description);
}

function setAuthor (author) {
    utils.setInner("mt-author", author);
}

function setCharset (charset) {
    utils.setInner("mt-charset", charset);
}

function setRobots (robots) {
    utils.setInner("mt-robots", robots);
}

function setViewport (viewport) {
    utils.setInner("mt-viewport", viewport);
}

function addError (title, description) {
    addMsg(title, description, "danger");
}

function addWarn (title, description) {
    addMsg(title, description, "warning");
}

function addSuccess (title, description) {
    addMsg(title, description, "success");
}

function setFavicon (url) {
  if (url == null || url == "") {
    return;
  }
  
  let origin = decodeURIComponent(window.location.href.split("/result?url=")[1] || "");
  
  if (!url.startsWith("http")) {
    url = origin + "/" + url;
  }
  
  utils.setInner("wb-icon", `<img src="https://seocat.glitch.me/api/pipe?url=${url}" alt="Website icon">`);
}

function addMsg (title, description, type) {
    utils.addInner("msg-list", `
    <div class="message is-${type}">
        <div class="message-header">
            ${title}
        </div>
        <div class="message-body">
            ${description}
            </div>
        </div>
    `)
}

async function scanWebsite() {
  let url = decodeURIComponent(window.location.href.split("/result?url=")[1]);
  setUrl(url);
  let result = await CRAW(url);
  setResult(JSON.parse(result));
}

function CRAW (url) {
    return new Promise((resolve) => {
      fetch('/api/craw', {
        method: 'POST',
        body: JSON.stringify({url}),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if(response.ok) {
            return response.text()
        } else {
          throw "Error calling AJAX request.";
        }
      }).then(function(text) {
        resolve(text)
      })
    });
  }

window.addEventListener("load", () => {
    scanWebsite();
})