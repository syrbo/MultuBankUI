const BASE_URL = "http://localhost:3000/api/";
const VBANK = "https://vbank.open.bankingapi.ru/"
const ABANK = "https://abank.open.bankingapi.ru/"
const SBANK = "https://sbank.open.bankingapi.ru/"
let VTOKEN = ""
let ATOKEN = ""
let STOKEN = ""
let VBANK_CONSENT_ID = ""
let ABANK_CONSENT_ID = ""
let SBANK_CONSENT_ID = ""
let VBANK_PCONSENT_ID = ""
let ABANK_PCONSENT_ID = ""
let SBANK_PCONSENT_ID = ""
let USERNAME = ""
let IS_PREMIUM = false
let SCENARIOS = [];
let CONTACTS = {};

let ACCOUNTS = {
    "vbank": {total_balance: 0, accounts: {}},
    "abank": {total_balance: 0, accounts: {}},
    "sbank": {total_balance: 0, accounts: {}}
}
let PRODUCTS = {
    "vbank": [],
    "abank": [],
    "sbank": []
}
let TRANSACTIONS = {
    "vbank": [],
    "abank": [],
    "sbank": []
}
let OLD_TRANSACTIONS = []

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function doHTTP(url, headers = {}, body = null, params = {}) {
    await sleep(150)
    const hasParams = params && Object.keys(params).length > 0
    if (hasParams) {
        const query = new URLSearchParams(params).toString()
        url = url + (url.includes("?") ? "&" : "?") + query
    }
    console.log(url)

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

function deepEqual(obj1, obj2) {
  // Check if they are the same reference or if both are null/undefined
  if (obj1 === obj2) {
    return true;
  }

  // Check if they are not objects or if one is null/undefined
  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if they have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through keys and recursively compare values
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function getArrayDifference(arr1, arr2) {
    const set2 = new Set(arr2);
    const set1 = new Set(arr1);
    
    return {
        inFirstNotSecond: arr1.filter(item => !set2.has(item)),
        inSecondNotFirst: arr2.filter(item => !set1.has(item))
    };
}