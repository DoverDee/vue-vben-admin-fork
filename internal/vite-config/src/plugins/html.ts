/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/DoverDee/vite-plugin-html
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin({ isBuild }: { isBuild: boolean }) {
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    viteNext: true,
  });
  return htmlPlugin;
}
