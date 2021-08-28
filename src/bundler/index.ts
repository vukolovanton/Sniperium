import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetchPlugin";
let esbuild = require("esbuild-wasm");

let executed = false;
const bundle = async (rawCode: string) => {
  if (!executed) {
    await esbuild.initialize({
      // wasmURL: "https://unpkg.com/esbuild-wasm@0.12.24/esbuild.wasm",
      wasmURL: "/esbuild.wasm",
      worker: true,
    });
    executed = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      target: ["es2020", "node16"],
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      // jsxFactory: "React.createElement",
      // jsxFragment: "React.Fragment",
    });
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (e) {
    return {
      code: "",
      err: e.message,
    };
  }
};

export default bundle;
