// @ts-ignore
import {defineConfig} from 'father';
import JarvisBotSDK from "./sdk/JarvisBotSDK";


export default defineConfig({
  umd: {
    entry: {
      // @ts-ignore
      'sdk/JarvisBotSDK': {
        name:'JarvisBotSDK',
        output:"demo/static"
      },
    },
    chainWebpack: (memo: any) => {
      memo.output.libraryExport('default');
      return memo;
    },
  },
});
