// ======================================
// GameForge AI
// imagePromptAI.js
// Image Generation Prompt AI
// ======================================



const IMAGE_KEY =

    "gameforge-image-history-v1";



let prompts =

    loadPrompts();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadPrompts(){


    const data =

        localStorage.getItem(

            IMAGE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function savePrompts(){


    localStorage.setItem(

        IMAGE_KEY,

        JSON.stringify(

            prompts

        )

    );


}



// --------------------------------------
// 画像プロンプト生成
// --------------------------------------

export function createImagePrompt({

    type="character",

    name="Hero",

    style="fantasy"

}){


    const prompt={


        id:

        "image_"

        +

        Date.now(),



        type,



        name,



        style,



        prompt:

        generatePrompt(

            type,

            name,

            style

        ),



        settings:

        createImageSettings(

            type

        ),



        created:

        Date.now()



    };



    prompts.push(

        prompt

    );



    savePrompts();



    return prompt;


}



// --------------------------------------
// プロンプト生成
// --------------------------------------

function generatePrompt(

    type,

    name,

    style

){


    const templates={


        character:

`
${name},

game character design,

detailed costume,

fantasy style,

high quality,

full body,

transparent background
`,



        monster:

`
${name},

fantasy monster design,

unique creature,

game enemy concept art,

detailed texture
`,



        background:

`
${name},

fantasy environment,

wide landscape,

game background art,

cinematic lighting
`,



        icon:

`
${name},

game UI icon,

clean shape,

transparent background,

high resolution
`


    };



    return templates[type]

    ||

    templates.character;


}



// --------------------------------------
// 画像設定
// --------------------------------------

function createImageSettings(

    type

){


    const settings={



        character:{


            size:

            "1024x1024",



            format:

            "png"



        },



        background:{


            size:

            "1920x1080",



            format:

            "jpg"



        },



        icon:{


            size:

            "512x512",



            format:

            "png"



        }



    };



    return settings[type]

    ||

    settings.character;


}



// --------------------------------------
// キャラクター画像
// --------------------------------------

export function createCharacterPrompt(

    name,

    style="fantasy"

){


    return createImagePrompt({


        type:

        "character",



        name,



        style


    });


}



// --------------------------------------
// 背景画像
// --------------------------------------

export function createBackgroundPrompt(

    name

){


    return createImagePrompt({


        type:

        "background",



        name


    });


}



// --------------------------------------
// UI素材
// --------------------------------------

export function createUIPrompt(

    name

){


    return createImagePrompt({


        type:

        "icon",



        name


    });


}



// --------------------------------------
// 検索
// --------------------------------------

export function searchPrompts(

    type

){


    return prompts.filter(

        item=>

        item.type===type

    );


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getImageHistory(){


    return prompts;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestImagePrompt(){


    return prompts[

        prompts.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getImageAIInfo(){


    return {


        name:

        "Image Prompt AI",



        version:

        "1.0",



        prompts:

        prompts.length


    };


}
