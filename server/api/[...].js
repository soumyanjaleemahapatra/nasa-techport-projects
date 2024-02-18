/* global useRuntimeConfig, proxyRequest */
export default async function (event) {
    const proxyUrl = useRuntimeConfig().public.apiBase;
    const path = event.path.replace(/^\/api\//, '');
    const target = new URL(path, proxyUrl).toString(); 
    return proxyRequest(event, target);
}