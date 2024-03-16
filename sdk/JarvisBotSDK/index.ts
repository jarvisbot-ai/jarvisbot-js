import type {SdkConfig, DynamicDispatchUrl} from "./type";
import type {Message} from "./params_chat";
import {JarvisMsg} from "./enums";
import {inner_completions, inner_dispatch, inner_img2img, inner_txt2img} from "./request";
import JarvisChatParams from "./params_chat";
import JarvisTxt2imgParams from "./params_txt2img";
import JarvisImg2imgParams from "./params_img2img";

export default class JarvisBotSDK {

    private readonly conf: SdkConfig;

    private dynamic_dispatch_url: DynamicDispatchUrl | undefined;

    private checkDispatch(){
        if (this.dynamic_dispatch_url == undefined) {
            throw new Error(JarvisMsg.dispatch_empty_err)
        }
    }

    private async chat(params: JarvisChatParams) {
        this.checkDispatch()
        return inner_completions(params, this.dynamic_dispatch_url.url_chat, this.conf)
    }

    private async txt2img(params: JarvisTxt2imgParams) {
        this.checkDispatch()
        return inner_txt2img(params, this.dynamic_dispatch_url.url_txt2img, this.conf)
    }

    private async img2img(params: JarvisImg2imgParams) {
        this.checkDispatch()
        return inner_img2img(params, this.dynamic_dispatch_url.url_img2img, this.conf)
    }

    private static getJarvisChatParams(messages: Message[]) {
        return new JarvisChatParams(messages)
    }

    private static getJarvisTxt2imgParams(prompt: string){
        return new JarvisTxt2imgParams(prompt)
    }

    private static getJarvisImg2imgParams(prompt: string, init_images:string[]){
        return new JarvisImg2imgParams(prompt,init_images)
    }

    public async dispatch() {
        return new Promise((resolve, reject) => {
            inner_dispatch(this.conf).then((data)=>{
                //console.log("dynamic_dispatch_url:", JSON.stringify(this.dynamic_dispatch_url, null, 2))
                this.dynamic_dispatch_url = data;
                resolve(JarvisMsg.dispatch_success)
            }).catch(e=>reject(e))
        })
    }

    /**
     * JarvisBotSDK
     * @public
     */
    public base = {
        chat:(params) => this.chat(params),
        txt2img: (params) => this.txt2img(params),
        img2img: (params) => this.img2img(params)
    }

    /**
     * param
     * @public
     */
    public param = {
        getChatParams: JarvisBotSDK.getJarvisChatParams,
        getTxt2imgParams: JarvisBotSDK.getJarvisTxt2imgParams,
        getImg2imgParams: JarvisBotSDK.getJarvisImg2imgParams
    }

    public static version_info = {
        version_str : "v1.0.6_2024_0317_0030"
    }

    /**
     * constructor
     * @param conf
     */
    constructor(conf: SdkConfig) {
        if (!conf.base_url){
            conf.base_url = "http://jarvisbot.emchub.ai:10013"
        }
        this.conf = conf;
    }
}
