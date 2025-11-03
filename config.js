const VBANK = "https://vbank.open.bankingapi.ru/"
const ABANK = "https://abank.open.bankingapi.ru/"
let VTOKEN = ""
let ATOKEN = ""
let STOKEN = ""
let VBANK_CONSENT_ID = ""
let ABANK_CONSENT_ID = ""
let SBANK_CONSENT_ID = ""
let USERNAME = ""

async function doHTTP(url, headers = {}, body = null, params = {}) {
    const hasParams = params && Object.keys(params).length > 0
    if (hasParams) {
        const query = new URLSearchParams(params).toString()
        url = url + (url.includes("?") ? "&" : "?") + query
    }

    // IMPORTANT: Do not send Access-Control-* headers from the browser.
    // These are response headers that must come from the server.
    const sanitizedHeaders = {"Content-Type": "application/json"}
    for (const key in headers) {
        const lower = key.toLowerCase()
        if (lower.startsWith("access-control-")) continue
        sanitizedHeaders[key] = headers[key]
    }

    const isPostLike = body !== null && body !== undefined
    const fetchInit = {
        method: isPostLike ? "POST" : "GET",
        headers: sanitizedHeaders,
        // Avoid setting Content-Type automatically for GET requests
        body: isPostLike ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
        // Let the browser handle CORS; server must return proper headers
        mode: "cors",
        credentials: "omit"
    }

    const response = await fetch(url, fetchInit)
    const contentType = response.headers.get("content-type") || ""
    if (!response.ok) {
        // Try to extract error body to aid debugging
        const errorBody = await response.text().catch(() => "")
        // throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorBody}`)
        return JSON.parse(errorBody);
    }
    if (contentType.includes("application/json")) {
        return await response.json()
    }
    return await response.text()
}
