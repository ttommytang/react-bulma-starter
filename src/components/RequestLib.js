// Helper function to sort out the Browser difference
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

export function postData(url, auth, params, onSuccess, onError) {
  console.log(url);
  var xhr = createCORSRequest('POST', url);
  
  
  xhr.setRequestHeader("Content-type", "application/json");
  if (auth) {
    xhr.setRequestHeader("Authorization", "Bearer " + auth);
  }
  var data = JSON.stringify(params);
  if(!xhr) {
    alert('CORS not supported!');
    return {};
  }

  xhr.onload = function() {
    // console.log("Response: ");
    // console.log(xhr.status);
    // console.log(xhr.responseText);

    if(xhr.status === 200) {
      try {
        var parsedResponse = JSON.parse(xhr.responseText);
      } catch(e) {
        parsedResponse = {};
        // alert(e);
      }
        
      onSuccess(parsedResponse);

    } else {
      onError(xhr.status, xhr.response);
    }
    return;
  }

  xhr.onerror = function() {
    onError(xhr.status, xhr.response);
    return;
  };

  xhr.send(data);
}

export function getData(url, auth, onSuccess, onError) {
  var xhr = createCORSRequest('GET', url);
  // console.log("Token: " + auth);
  console.log(url);
  if (auth) {
    xhr.setRequestHeader("Authorization", "Bearer " + auth);
  }

  if(!xhr) {
    alert('CORS not supported!');
    return {};
  }

  xhr.onload = function() {
    // console.log("Response: ");
    //console.log(xhr.status);
    //console.log(xhr.responseText);

    if(xhr.status === 200) {
      var parsedResponse = JSON.parse(xhr.responseText);
      onSuccess(parsedResponse);
    } else {
      onError(xhr.status, xhr.response);
    }
    return;
  }

  xhr.onerror = function() {
    //console.log(xhr.status);
    onError(xhr.status, xhr.response);
    return;
  };

  xhr.send();
}