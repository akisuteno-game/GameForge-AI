// ======================================
// GameForge AI
// balanceAI.js
// Game Balance AI
// ======================================


const BALANCE_KEY =
    "gameforge-balance-history-v1";


let balances =
    loadBalances();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBalances(){


    const data =
        localStorage.getItem(

            BALANCE_KEY

        );


    return data
        ? JSON.parse(data)
        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBalances(){


    localStorage.setItem(

        BALANCE_KEY,

        JSON.stringify(

            balances

        )

    );


}



// --------------------------------------
// バランス生成
// --------------------------------------

export function createBalance({

    gameType="rpg",

    stages=100

}){


    const balance = {


        id:

        "balance_"

        +

        Date.now(),



        gameType,



        stages,



        enemyCurve:

        generateEnemyCurve(

            stages

        ),



        rewardCurve:

        generateRewardCurve(

            stages

        ),



        playerCurve:

        generatePlayerCurve(

            stages

        ),



        created:

        Date.now()



    };



    balances.push(

        balance

    );



    saveBalances();



    return balance;


}



// --------------------------------------
// 敵成長曲線
// --------------------------------------

function generateEnemyCurve(

    stages

){


    const curve=[];



    for(

        let i=1;

        i<=stages;

        i++

    ){


        curve.push({


            stage:i,



            hp:

            Math.floor(

                100 *

                Math.pow(

                    1.15,

                    i

                )

            ),



            atk:

            Math.floor(

                20 *

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
// 報酬曲線
// --------------------------------------

function generateRewardCurve(

    stages

){


    const curve=[];



    for(

        let i=1;

        i<=stages;

        i++

    ){


        curve.push({


            stage:i,



            gold:

            Math.floor(

                50 *

                Math.pow(

                    1.1,

                    i

                )

            ),



            exp:

            Math.floor(

                30 *

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
// プレイヤー成長
// --------------------------------------

function generatePlayerCurve(

    stages

){


    const curve=[];



    for(

        let i=1;

        i<=stages;

        i++

    ){


        curve.push({


            level:i,



            power:

            Math.floor(

                100 *

                Math.pow(

                    1.13,

                    i

                )

            )



        });


    }



    return curve;


}



// --------------------------------------
// 難易度評価
// --------------------------------------

export function evaluateDifficulty({

    playerPower,

    enemyPower

}){


    const ratio =

        playerPower /

        enemyPower;



    if(

        ratio >= 2

    ){


        return "easy";


    }



    if(

        ratio >= 1

    ){


        return "normal";


    }



    return "hard";


}



// --------------------------------------
// 報酬調整
// --------------------------------------

export function adjustReward({

    reward,

    difficulty

}){


    let multiplier=1;



    if(

        difficulty==="hard"

    ){


        multiplier=1.5;


    }



    else if(

        difficulty==="easy"

    ){


        multiplier=0.8;


    }



    return {


        gold:

        Math.floor(

            reward.gold *

            multiplier

        ),



        exp:

        Math.floor(

            reward.exp *

            multiplier

        )



    };


}



// --------------------------------------
// 放置ゲーム向け調整
// --------------------------------------

export function idleBalance({

    offlineHours

}){


    return {


        maxRewardHours:

        12,



        bonus:

        Math.min(

            offlineHours *

            0.1,

            2

        )



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getBalanceHistory(){


    return balances;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestBalance(){


    return balances[

        balances.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBalanceAIInfo(){


    return {


        name:

        "Balance AI",



        version:

        "1.0",



        designs:

        balances.length


    };


}
