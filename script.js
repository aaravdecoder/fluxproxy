async function goProxy(e){
  e.preventDefault();
  const input = document.getElementById("searchInput").value.trim();
  if(!input) return;

  let url;
  if(input.includes(".") && !input.includes(" ")) {
    url = input.startsWith("http") ? input : "https://" + input;
  } else {
    url = "https://www.google.com/search?q=" + encodeURIComponent(input);
  }

  const workerURL = "https://fluxworker.aarav-rawat1209.workers.dev/proxy?url=" + encodeURIComponent(url);

  const container = document.getElementById("proxy-container");
  container.innerHTML = "<p style='color:white;text-align:center;'>Loading...</p>";

  try {
    const response = await fetch(workerURL);
    const html = await response.text();
    container.innerHTML = html;

    // Ensure all links in the container stay in the proxy
    container.querySelectorAll('a').forEach(link => link.target="_self");
  } catch(err) {
    container.innerHTML = "<p style='color:red;text-align:center;'>Error loading site: "+err+"</p>";
  }
}
