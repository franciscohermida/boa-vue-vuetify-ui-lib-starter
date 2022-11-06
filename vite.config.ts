import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import dts from "vite-plugin-dts";
import Components from "unplugin-vue-components/vite";
import { Vuetify3Resolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      vue(),
      Components({
        // TODO: Include Vuetify 3 Directives
        resolvers: [Vuetify3Resolver()],
      }),
      dts(),
    ],

    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "@boa/vue-vuetify-ui-lib-starter",
        fileName: "index",
        formats: ["es", "cjs", "umd"],
      },
      rollupOptions: {
        /**
         * DESC:
         * make sure to externalize deps that shouldn't be bundled
         * into your library
         */
        external: ["vue", "vuetify", "vuetify/components", "vuetify/directives"],
        output: {
          /**
           * DESC:
           * Provide global variables to use in the UMD build
           * for externalized deps
           */
          globals: {
            vue: "Vue",
            vuetify: "Vuetify",
            "vuetify/components": "VuetifyComponents",
            "vuetify/directives": "VuetifyDirectives",
          },
        },
      },
    },
  };
});
