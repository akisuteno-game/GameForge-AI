// ======================================
// GameForge AI
// systemMaker.js
// Game System Generator
// ======================================



const SYSTEM_KEY =
    "gameforge-system-data-v1";



let systems =
    loadSystems();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadSystems(){


    const data =
        localStorage.getItem(
            SYSTEM_KEY
        );


    return data

        ? JSON.parse(data)

        : [];

}



// --------------------------------------
// 保存
// --------------------------------------

function saveSystems(){


    localStorage.setItem(

        SYSTEM_KEY,

        JSON.stringify(
            systems
        )

    );


}



// --------------------------------------
// システムテンプレート
// --------------------------------------

const Templates = {


    rpg:{


        battle:{


            type:
            "リアルタイムゲージバトル",


            features:[

                "攻撃速度",

                "スキル",

                "敵AI",

                "ダメージ計算"

            ]

        },



        growth:{


            type:
            "レベル成長システム",


            features:[

                "経験値",

                "ステータス",

                "装備強化"

            ]

        }


    },



    idle:{


        battle:{


            type:
            "自動戦闘システム",


            features:[

                "放置報酬",

                "自動攻撃",

                "オフライン報酬"

            ]

        },



        growth:{


            type:
            "永続強化システム",


            features:[

                "転生",

                "覚醒",

                "能力解放"

            ]

        }


    }



};



// --------------------------------------
// システム生成
// --------------------------------------

export function generateSystemDesign(

    genre=[]

){


    let base =
        Templates.rpg;



    if(

        genre.includes("idle")

    ){

        base =
            Templates.idle;

    }



    const design={


        id:

            "system_"

            +

            Date.now(),



        battle:


            base.battle,



        growth:


            base.growth,



        item:{


            type:
            "素材収集型アイテム",


            features:[

                "素材",

                "装備",

                "強化"

            ]

        },



        skill:{


            type:
            "アクティブスキル",


            features:[

                "スキルレベル",

                "クールタイム"

            ]

        },



        achievement:{


            type:
            "実績解放",


            count:100


        },



        ui:{


            layout:[

                "ステータス",

                "バトル画面",

                "強化画面",

                "設定画面"

            ]

        },



        created:

            Date.now()


    };



    systems.push(

        design

    );


    saveSystems();



    return design;


}



// --------------------------------------
// カスタム追加
// --------------------------------------

export function addSystemFeature(

    id,

    category,

    feature

){


    const system =

        systems.find(

            s=>

            s.id===id

        );



    if(!system){

        return false;

    }



    if(

        !system[category]

    ){

        system[category]={};

    }



    if(

        !system[category].features

    ){

        system[category].features=[];

    }



    system[category]

    .features

    .push(feature);



    saveSystems();



    return true;


}



// --------------------------------------
// システム取得
// --------------------------------------

export function getSystemDesign(

    id

){


    return systems.find(

        s=>

        s.id===id

    );


}



// --------------------------------------
// 一覧
// --------------------------------------

export function getSystems(){


    return systems;


}



// --------------------------------------
// 仕様書生成
// --------------------------------------

export function exportSystemDocument(

    id

){


    const s =

        getSystemDesign(id);



    if(!s){

        return "";

    }



    return `

# Game System Design



## Battle

${JSON.stringify(

s.battle,

null,

2

)}



## Growth

${JSON.stringify(

s.growth,

null,

2

)}



## Item

${JSON.stringify(

s.item,

null,

2

)}



## Skill

${JSON.stringify(

s.skill,

null,

2

)}



## UI

${JSON.stringify(

s.ui,

null,

2

)}



`;

}



// --------------------------------------
// 情報
// --------------------------------------

export function getSystemMakerInfo(){


    return {


        name:

        "GameForge System Maker AI",


        version:

        "1.0",


        systems:

        systems.length


    };


}
