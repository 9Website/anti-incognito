export async function onRequestGet(context) {
    const { request, env } = context;
    const clientIp = request.headers.get("cf-connecting-ip") || "127.0.0.1";
    
    const isRemembered = await env.IP_STORE.get(clientIp);

    return new Response(JSON.stringify({
        ip: clientIp,
        remembered: !!isRemembered
    }), {
        headers: { "Content-Type": "application/json" }
    });
}
