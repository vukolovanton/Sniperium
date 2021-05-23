import axios from "axios";
import localForage from "localforage";
import { PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild-wasm";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: PluginBuild) {
      // Default
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      // Check if we already fetched and cached file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }
      });

      // Handle css
      build.onLoad(
        { filter: /.css$/ },
        async (args: OnLoadArgs): Promise<any> => {
          const { data, request } = await axios.get(args.path);

          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");
          const contents = `
						const style = document.createElement('style');
						style.innerText = '${escaped}';
						document.head.appendChild(style)
					`;

          const result = {
            loader: "jsx",
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          // Store response in cache
          await fileCache.setItem(args.path, result);

          return result;
        }
      );

      // Handle jsx
      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);

        const result: OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
