export default {
  async fetch(request, env) {
    if (!["GET", "HEAD"].includes(request.method))
      return new Response("Method Not Allowed", {status:405,headers:{Allow:"GET, HEAD"}});
    const url = new URL(request.url);
    // Preserve incoming RTD links, queries and browser-side anchors.
    if (/^\/en\/(latest|stable)(\/|$)/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/^\/en\/(latest|stable)(\/|$)/, "/");
      return Response.redirect(url.href, 301);
    }
    let path;
    try { path = decodeURIComponent(url.pathname).replace(/^\/+/, ""); }
    catch { return new Response("Bad Request", {status:400}); }
    const pointer = await env.SITES.get("info.bma.ai/active.json");
    if (!pointer) return new Response("Site not published", {status:503});
    const release = await pointer.json();
    if (!/^[0-9a-f]{40}$/.test(release.commit))
      return new Response("Invalid release", {status:503});
    const base = "info.bma.ai/releases/" + release.commit + "/";
    let object = await env.SITES.get(base + (path.endsWith("/") || !path ? path+"index.html" : path));
    if (!object && path && !path.endsWith("/")) {
      object = await env.SITES.get(base + path + "/index.html");
      if (object) { url.pathname += "/"; return Response.redirect(url.href,301); }
    }
    if (!object) return new Response("Not Found", {status:404});
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("ETag", object.httpEtag);
    headers.set("X-Static-Origin", "cloudflare-r2");
    headers.set("X-Docs-Commit", release.commit);
    headers.set("X-Content-Type-Options", "nosniff");
    if (request.headers.get("If-None-Match") === object.httpEtag)
      return new Response(null,{status:304,headers});
    return new Response(request.method === "HEAD" ? null : object.body,{headers});
  }
};
