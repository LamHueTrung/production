"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSSR = setupSSR;
const jsx_runtime_1 = require("react/jsx-runtime");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const vite_1 = require("vite");
const server_1 = require("react-dom/server");
const env_1 = require("../config/env");
async function setupSSR(app, isProd) {
    const root = path_1.default.resolve(__dirname, "../resource");
    if (!isProd) {
        const vite = await (0, vite_1.createServer)({
            root,
            server: { middlewareMode: true },
            appType: "custom",
        });
        app.use(vite.middlewares);
        app.use("*", async (req, res) => {
            try {
                const url = req.originalUrl;
                const templatePath = path_1.default.resolve(root, "index.html");
                let template = fs_1.default.readFileSync(templatePath, "utf-8");
                template = await vite.transformIndexHtml(url, template);
                const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
                const fullUrl = `${req.protocol}://${req.get("host")}${url}`;
                const appHtml = await render(fullUrl);
                const html = template.replace(`<!--app-html-->`, appHtml);
                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            }
            catch (e) {
                vite.ssrFixStacktrace(e);
                const { default: Error500 } = await Promise.resolve().then(() => __importStar(require("../resource/src/pages/error/Error500")));
                const errorHtml = (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(Error500, { message: e.message, error: e.stack }));
                const fallbackHtml = `
          <!DOCTYPE html>
          <html lang="vi">
            <head>
              <meta charset="UTF-8" />
              <title>Lỗi máy chủ nội bộ</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body { margin: 0; padding: 0; background: #f8f9fa; font-family: sans-serif; }
              </style>
            </head>
            <body>
              <div id="root">${errorHtml}</div>
            </body>
          </html>
        `;
                res.status(500).set({ "Content-Type": "text/html" }).end(fallbackHtml);
            }
        });
    }
    else {
        const rootDir = path_1.default.resolve(__dirname, "..");
        const clientPath = path_1.default.resolve(rootDir, "resource/client");
        const serverPath = path_1.default.resolve(rootDir, "resource/server");
        const templatePath = path_1.default.join(clientPath, "index.html");
        let manifestPath = path_1.default.join(clientPath, 'manifest.json');
        if (!fs_1.default.existsSync(manifestPath)) {
            manifestPath = path_1.default.join(clientPath, '.vite/manifest.json');
        }
        const template = fs_1.default.readFileSync(templatePath, "utf-8");
        const manifest = JSON.parse(fs_1.default.readFileSync(manifestPath, "utf-8"));
        app.use("/assets", express_1.default.static(path_1.default.join(clientPath, "assets"), { maxAge: "1y" }));
        const entryServerPathJs = path_1.default.join(serverPath, 'entry-server.js');
        const entryServerPathMjs = path_1.default.join(serverPath, 'entry-server.mjs');
        const entryServer = require(fs_1.default.existsSync(entryServerPathJs) ? entryServerPathJs : entryServerPathMjs);
        const { render } = entryServer;
        app.use("*", async (req, res) => {
            try {
                const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
                const appHtml = await render(fullUrl);
                const html = template.replace(`<!--app-html-->`, appHtml);
                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            }
            catch (e) {
                if (env_1.Env.app.debug) {
                    console.error("[SSR Error Stack]:", e);
                }
                const { default: Error500 } = await Promise.resolve().then(() => __importStar(require("../resource/src/pages/error/Error500")));
                const errorHtml = (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(Error500, { message: e.message, error: e.stack }));
                const html = `
          <!DOCTYPE html>
          <html lang="vi">
            <head>
              <meta charset="UTF-8" />
              <title>Lỗi máy chủ nội bộ</title>
            </head>
            <body>
              <div id="root">${errorHtml}</div>
            </body>
          </html>
        `;
                res.status(500).set({ "Content-Type": "text/html" }).end(html);
            }
        });
    }
}
//# sourceMappingURL=ssr.js.map