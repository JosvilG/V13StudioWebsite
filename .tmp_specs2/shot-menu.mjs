import { spawn } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
const url = process.argv[2] || "http://localhost:3000/es"
const out = process.argv[3] || "shot.png"
const W = Number(process.argv[4] || 1376)
const H = Number(process.argv[5] || 768)
const port = 9322 + Math.floor(Math.random() * 400)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cdp-"))

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  `--window-size=${W},${H}`,
  "--enable-unsafe-swiftshader",
  "--use-gl=angle",
  "--use-angle=swiftshader",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
])
chrome.on("error", (e) => { console.error("spawn err", e); process.exit(1) })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getWs() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`)
      const j = await r.json()
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl
    } catch {}
    await sleep(150)
  }
  throw new Error("no devtools")
}

let id = 0
function rpc(ws, method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const mid = ++id
    const msg = { id: mid, method, params }
    if (sessionId) msg.sessionId = sessionId
    const onMsg = (ev) => {
      const d = JSON.parse(ev.data)
      if (d.id === mid) {
        ws.removeEventListener("message", onMsg)
        d.error ? reject(new Error(d.error.message)) : resolve(d.result)
      }
    }
    ws.addEventListener("message", onMsg)
    ws.send(JSON.stringify(msg))
  })
}

const main = async () => {
  const wsUrl = await getWs()
  const ws = new WebSocket(wsUrl)
  await new Promise((r) => (ws.onopen = r))

  const { targetId } = await rpc(ws, "Target.createTarget", { url: "about:blank" })
  const { sessionId } = await rpc(ws, "Target.attachToTarget", { targetId, flatten: true })
  const S = sessionId

  await rpc(ws, "Page.enable", {}, S)
  await rpc(ws, "Runtime.enable", {}, S)
  await rpc(ws, "Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: W < 500 }, S)

  await rpc(ws, "Page.navigate", { url }, S)
  await sleep(4500)
  await rpc(ws, "Runtime.evaluate", { expression: "document.querySelector('button[aria-label=\"Open menu\"]').click()" }, S)
  await sleep(3800)
  const { data } = await rpc(ws, "Page.captureScreenshot", { format: "png" }, S)
  fs.writeFileSync(out, Buffer.from(data, "base64"))
  console.log("saved", out)
  ws.close()
  chrome.kill()
  process.exit(0)
}
main().catch((e) => { console.error(e); chrome.kill(); process.exit(1) })
