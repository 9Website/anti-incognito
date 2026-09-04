export async function onRequestGet(context) {
    const { request, env } = context;
    // Get visitor IP injected by Cloudflare
    const clientIp = request.headers.get("cf-connecting-ip") || "127.0.0.1";
    
    // Check if this IP exists in Cloudflare KV storage
    // Note: 'IP_STORE' will be our KV namespace binding name
    const isRemembered = await env.IP_STORE.get(clientIp);

    return new Response(JSON.stringify({
        ip: clientIp,
        remembered: !!isRemembered
    }), {
        headers: { "Content-Type": "application/json" }
    });
}
