export type SdkConfig = {
    app_token: string,
    base_url?:string
}

export type DynamicDispatchUrl = {
    url_chat: string,
    url_asr: string,
    url_tts: string,
    url_txt2img: string,
    url_img2img: string,
}

export type Result<T> = Promise<{
    code: 0 | 1,
    data: T,
    msg: string
}>