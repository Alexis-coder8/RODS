import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
//#region src/App.tsx
function App() {
	return /* @__PURE__ */ jsx("div", {
		className: "App",
		children: /* @__PURE__ */ jsx("h1", { children: "HELLO TEMILOLUWA" })
	});
}
//#endregion
//#region src/entry-server.tsx
function render(_url) {
	return { html: renderToString(/* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })) };
}
//#endregion
export { render };
