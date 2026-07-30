// ======================================
// GameForge AI
// economyAI.js
// Economy Balance AI
// ======================================



const ECONOMY_KEY =

    "gameforge-economy-history-v1";



let economies =

    loadEconomies();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadEconomies(){


    const data =

        localStorage.getItem(

            ECONOMY_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveEconomies(){


    localStorage.setItem(

        ECONOMY_KEY,

        JSON.stringify(

            economies

        )

    );


}



// --------------------------------------
// 経済システム作成
// --------------------------------------

export function createEconomy({

    gameType="rpg",

    stage=100

}){


    const economy={


        id:

        "economy_"

        +

        Date.now(),



        gameType,



        stage,



        goldCurve:

        generateGoldCurve(

            stage

        ),



        itemValue:

        generateItemValues(),



        shop:

        createShop(),



        inflation:

        0,



        created:

        Date.now()



    };



    economies.push(

        economy

    );



    saveEconomies();



    return economy;


}



// --------------------------------------
// ゴールド成長
// --------------------------------------

function generateGoldCurve(

    stage

){


    const curve=[];



    for(

        let i=1;

        i<=stage;

        i++

    ){


        curve.push({


            stage:i,



            gold:

            Math.floor(

                100 *

                Math.pow(

                    1.12,

                    i

                )

            )



        });


    }



    return curve;


}



// --------------------------------------
// アイテム価値
// --------------------------------------

function generateItemValues(){


    return {


        common:

        10,



        uncommon:

        100,



        rare:

        1000,



        legendary:

        10000



    };


}



// --------------------------------------
// ショップ生成
// --------------------------------------

function createShop(){


    return [


        {


            item:

            "回復薬",



            price:

            100



        },



        {


            item:

            "強化石",



            price:

            1000



        },



        {


            item:

            "伝説装備",



            price:

            100000



        }



    ];


}



// --------------------------------------
// 価格調整
// --------------------------------------

export function adjustPrice(

    price,

    demand

){


    return Math.floor(

        price *

        (1 +

        demand *

        0.1)

    );


}



// --------------------------------------
// インフレ分析
// --------------------------------------

export function analyzeInflation({

    playerGold,

    averagePrice

}){


    const ratio =

        playerGold /

        averagePrice;



    if(

        ratio > 100

    ){


        return {


            status:

            "inflation",

            level:

            "high"


        };


    }



    return {


        status:

        "normal",


        level:

        "stable"


    };


}



// --------------------------------------
// 放置報酬
// --------------------------------------

export function calculateOfflineReward({

    hours,

    goldPerHour

}){


    return {


        gold:

        Math.floor(

            hours *

            goldPerHour

        ),



        maxHours:

        24



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getEconomyHistory(){


    return economies;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestEconomy(){


    return economies[

        economies.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getEconomyAIInfo(){


    return {


        name:

        "Economy AI",



        version:

        "1.0",



        systems:

        economies.length


    };


}
