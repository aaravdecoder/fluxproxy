async function goProxy(e) {
  e.preventDefault();

  const input = document.getElementById("searchInput").value.trim();
  if (!input) return;

  let url;

  // Determine if input is a URL or a search term
  if (input.includes(".") && !input.includes(" ")) {
    url = input.startsWith("http") ? input : "https://" + input;
  } else {
    // Convert search term to Google search URL
    url = "https://www.google.com/search?q=" + encodeURIComponent(input);
  }

  // Encode URL for the Worker
  const workerURL =
    "https://fluxworker.aarav-rawat1209.workers.dev/proxy?url=" +
    encodeURIComponent(url);

  const container = document.getElementById("proxy-container");
  container.innerHTML = "<p style='color:white; text-align:center;'>Loading...</p>";

  try {
    const response = await fetch(workerURL);
    const html = await response.text();

    // Inject the fetched HTML into the container
    container.innerHTML = html;

    // Optional: adjust relative links so navigation works inside the container
    const links = container.querySelectorAll("a");
    links.forEach(link => {
      link.target = "_self"; // stay inside container
    });

  } catch (err) {
    container.innerHTML =
      "<p style='color:red; text-align:center;'>Error loading site: " +
      err +
      "</p>";
  }
}
