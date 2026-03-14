function goProxy(e){
  e.preventDefault();

  const input = document.getElementById("searchInput").value.trim();
  if(!input) return;

  let url;

  // If it looks like a URL
  if(input.includes(".") && !input.includes(" ")){
    url = input.startsWith("http") ? input : "https://" + input;
  } 
  else {
    // Otherwise search with Google
    url = "https://www.google.com/search?q=" + encodeURIComponent(input);
  }

  // Send request to proxy
  window.location.href = "/proxy?url=" + encodeURIComponent(url);
}
