// ======================================
// GameForge AI
// assetAI.js
// Asset Management AI
// ======================================



const ASSET_KEY =

    "gameforge-asset-history-v1";



let assets =

    loadAssets();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadAssets(){


    const data =

        localStorage.getItem(

            ASSET_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveAssets(){


    localStorage.setItem(

        ASSET_KEY,

        JSON.stringify(

            assets

        )

    );


}



// --------------------------------------
// アセット作成
// --------------------------------------

export function createAsset({

    type="character",

    name="Unknown",

    style="fantasy"

}){


    const asset={


        id:

        "asset_"

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



        status:

        "planned",



        created:

        Date.now()



    };



    assets.push(

        asset

    );



    saveAssets();



    return asset;


}



// --------------------------------------
// 画像生成プロンプト
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

fantasy game character,

detailed armor,

high quality,

${style} style

`,



        monster:

        `

${name},

fantasy monster,

unique design,

game enemy concept art,

${style} style

`,



        item:

        `

${name},

game item icon,

clean design,

transparent background

`



    };



    return templates[type]

    ||

    templates.character;


}



// --------------------------------------
// キャラクター設計
// --------------------------------------

export function createCharacterAsset({

    name,

    role

}){


    return createAsset({


        type:

        "character",



        name,



        style:

        `${role} fantasy`


    });


}



// --------------------------------------
// モンスター設計
// --------------------------------------

export function createMonsterAsset({

    name,

    rank="normal"

}){


    return createAsset({


        type:

        "monster",



        name,



        style:

        `${rank} monster`


    });


}



// --------------------------------------
// アイテム設計
// --------------------------------------

export function createItemAsset(

    name

){


    return createAsset({


        type:

        "item",



        name


    });


}



// --------------------------------------
// 音素材管理
// --------------------------------------

export function createSoundAsset(

    name

){


    return {


        id:

        "sound_"

        +

        Date.now(),



        name,



        type:

        "sound",



        status:

        "planned"



    };


}



// --------------------------------------
// アセット状態変更
// --------------------------------------

export function updateAssetStatus(

    id,

    status

){


    const asset =

        assets.find(

            a=>

            a.id===id

        );



    if(!asset){

        return null;

    }



    asset.status=

        status;



    saveAssets();



    return asset;


}



// --------------------------------------
// 一覧取得
// --------------------------------------

export function getAssets(){


    return assets;


}



// --------------------------------------
// 種類検索
// --------------------------------------

export function searchAssets(

    type

){


    return assets.filter(

        asset=>

        asset.type===type

    );


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestAsset(){


    return assets[

        assets.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getAssetAIInfo(){


    return {


        name:

        "Asset AI",



        version:

        "1.0",



        assets:

        assets.length


    };


}
