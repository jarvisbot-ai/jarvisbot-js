
export default class JarvisImg2imgParams {
    alwayson_scripts?: {} = {};
    batch_size?: number = 1;
    cfg_scale?: number = 7;
    comments?: any;
    denoising_strength?: number = 0.75;
    disable_extra_networks?:boolean = false;
    do_not_save_grid?: boolean = false;
    do_not_save_samples?: boolean = false;
    // enable_hr?:boolean = false;
    eta?: any;
    // firstphase_height?:number = 0;
    // firstphase_width?:number = 0;
    height?:number = 512;
    // hr_checkpoint_name?: any;
    // hr_negative_prompt?: string = "";
    // hr_prompt?: string = "";
    // hr_resize_x:number = 0;
    // hr_resize_y:number = 0;
    // hr_sampler_name?: any;
    // hr_scale?: number = 2;
    // hr_second_pass_steps?: number = 0;
    // hr_upscaler?:any;
    image_cfg_scale?: any;
    include_init_images: boolean = false;
    init_images?: string[] = [];
    initial_noise_multiplier?: any;
    inpaint_full_res?: boolean = true;
    inpaint_full_res_padding?: number = 0;
    inpainting_fill?: number = 0;
    inpainting_mask_invert?:number = 0;
    latent_mask?: any;
    mask?: any;
    mask_blur?: any;
    mask_blur_x?: number = 4;
    mask_blur_y?: number = 4;
    n_iter?: number = 1;
    negative_prompt?: string= "";
    override_settings?: any;
    override_settings_restore_afterwards?: boolean = true;
    prompt?: string = "dog";
    refiner_checkpoint?: any;
    refiner_switch_at?: any;
    resize_mode?:number = 0;
    restore_faces?: any;
    s_churn?: any;
    s_min_uncond?: any;
    s_noise?: any;
    s_tmax?: any;
    s_tmin?: any;
    sampler_index?: string = "Euler";
    sampler_name?: any;
    save_images?: boolean = false;
    script_args?: [];
    script_name?: any;
    seed?: number = -1;
    seed_resize_from_h?: number = -1;
    seed_resize_from_w?:number = -1;
    send_images?:boolean = true;
    steps?: number = 20;
    styles?: any;
    subseed?: number = -1;
    subseed_strength?: number = 0;
    tiling?: any;
    width?:number = 512;

    constructor(prompt: string,init_images:string[]) {
        this.prompt = prompt
        this.init_images = init_images
    }
}



// export default class JarvisImg2imgParams {
//
//     height?:number = 512;
//
//     init_images?: string[] = [];
//     width?:number = 512;
//     prompt?: string = "dog";
//
//     constructor(prompt: string,init_images:string[]) {
//         this.prompt = prompt
//         this.init_images = init_images
//     }
// }