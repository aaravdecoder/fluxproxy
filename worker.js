export default {
  async fetch(request) {

    const url = new URL(request.url)

    // Only handle /proxy requests
    if (url.pathname === "/proxy") {

      const target = url.searchParams.get("url")
      if (!target) {
        return new Response("Missing url parameter", { status: 400 })
      }

      try {
        // Fetch the target website
        const response = await fetch(target, {
          method: request.method,
          headers: request.headers,
          redirect: "follow"
        })

        // Return the response as-is
        return new Response(response.body, {
          status: response.status,
          headers: response.headers
        })

      } catch (err) {
        return new Response("Proxy error: " + err.toString(), { status: 500 })
      }
    }

    // Default message if someone visits the worker URL without /proxy
    return new Response("Running", { status: 200 })
  }
}
