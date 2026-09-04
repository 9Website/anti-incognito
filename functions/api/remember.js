export async function onRequestPost(context) {
    const { request, env } = context;
    const clientIp = request.headers.get("cf-connecting-ip") || "127.0.0.1";
    
    // Save IP to KV storage
    await env.IP_STORE.put(clientIp, "true");

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
    });
}
