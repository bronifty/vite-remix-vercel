import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { createElement } from "react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
const LiveReload = process.env.NODE_ENV !== "development" ? () => null : () => createElement("script", {
  type: "module",
  suppressHydrationWarning: true,
  dangerouslySetInnerHTML: { __html: `
   import RefreshRuntime from "/@id/__x00__virtual:hmr-runtime"
   RefreshRuntime.injectIntoGlobalHook(window)
   window.$RefreshReg$ = () => {}
   window.$RefreshSig$ = () => (type) => type
   window.__vite_plugin_react_preamble_installed__ = true
 ` }
});
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Navigation() {
  return /* @__PURE__ */ jsxs("ul", {
    className: "text-red-500",
    children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "test", children: "Go to test!" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Go bacc!" }) })
    ]
  });
}
function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ jsxs("head", {
        children: [
          /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
          /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
          /* @__PURE__ */ jsx(Meta, {}),
          /* @__PURE__ */ jsx(Links, {})
        ]
      }),
      /* @__PURE__ */ jsxs("body", {
        children: [
          /* @__PURE__ */ jsx(Navigation, {}),
          /* @__PURE__ */ jsx(Outlet, {}),
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(LiveReload, {}),
          /* @__PURE__ */ jsx(Scripts, {})
        ]
      })
    ]
  });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: "index file datas test" }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const _virtual_serverManifest = { "entry": { "module": "/build/assets/entry.client-1dd82fdc.js", "imports": ["/build/assets/jsx-runtime-26afeca0.js", "/build/assets/components-eb3f5fdc.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasErrorBoundary": false, "module": "/build/assets/root-3184e9c6.js", "imports": ["/build/assets/jsx-runtime-26afeca0.js", "/build/assets/components-eb3f5fdc.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasErrorBoundary": false, "module": "/build/assets/_index-47773d94.js", "imports": ["/build/assets/jsx-runtime-26afeca0.js"], "css": [] } }, "url": "/build/manifest-5c9f4ed4.js", "version": "5c9f4ed4" };
const assetsBuildDirectory = "public/build";
const future = { "v3_fetcherPersist": false };
const publicPath = "/build/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  _virtual_serverManifest as assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
};
