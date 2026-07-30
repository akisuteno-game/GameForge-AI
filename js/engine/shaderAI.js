// ======================================
// GameForge AI
// shaderAI.js
// Shader & Graphics Design AI
// ======================================



const SHADER_KEY =

    "gameforge-shader-history-v1";



let shaders =

    loadShaders();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadShaders(){


    const data =

        localStorage.getItem(

            SHADER_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveShaders(){


    localStorage.setItem(

        SHADER_KEY,

        JSON.stringify(

            shaders

        )

    );


}



// --------------------------------------
// グラフィック設定生成
// --------------------------------------

export function createGraphicsProfile({

    quality="high",

    style="fantasy"

}){


    const profile={


        id:

        "shader_"

        +

        Date.now(),



        quality,



        style,



        material:

        createMaterial(),



        lighting:

        createLighting(),



        effects:

        createEffects(),



        environment:

        createEnvironment(),



        created:

        Date.now()



    };



    shaders.push(

        profile

    );



    saveShaders();



    return profile;


}



// --------------------------------------
// マテリアル生成
// --------------------------------------

function createMaterial(){


    return {


        type:

        "physically_based",



        metallic:

        0.2,



        roughness:

        0.5,



        texture:

        true



    };


}



// --------------------------------------
// ライティング
// --------------------------------------

function createLighting(){


    return {


        shadow:

        true,



        realtime:

        true,



        ambient:

        0.5,



        bloom:

        true



    };


}



// --------------------------------------
// エフェクト
// --------------------------------------

function createEffects(){


    return [


        {


            name:

            "bloom",



            enabled:

            true



        },



        {


            name:

            "fog",



            enabled:

            true



        },



        {


            name:

            "particle",



            enabled:

            true



        }



    ];


}



// --------------------------------------
// 環境生成
// --------------------------------------

function createEnvironment(){


    return {


        sky:

        "dynamic",



        weather:

        [

            "rain",

            "snow",

            "storm"

        ],



        dayNight:

        true



    };


}



// --------------------------------------
// 天候設定
// --------------------------------------

export function createWeather({

    type="rain"

}){


    return {


        type,



        particles:

        true,



        sound:

        true,



        intensity:

        0.7



    };


}



// --------------------------------------
// エフェクト追加
// --------------------------------------

export function addEffect(

    profile,

    effect

){


    profile.effects.push({


        name:

        effect,



        enabled:

        true



    });



    saveShaders();



    return profile;


}



// --------------------------------------
// 品質調整
// --------------------------------------

export function optimizeGraphics(

    profile,

    device="pc"

){


    if(

        device==="mobile"

    ){


        profile.quality=

        "medium";



        profile.effects=

        profile.effects.filter(

            e=>

            e.name!=="heavy"

        );


    }



    return profile;


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getShaderHistory(){


    return shaders;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestShader(){


    return shaders[

        shaders.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getShaderAIInfo(){


    return {


        name:

        "Shader AI",



        version:

        "1.0",



        profiles:

        shaders.length


    };


}
