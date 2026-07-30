// ======================================
// GameForge AI
// balanceTestAI.js
// Game Balance Testing AI
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
// バランステスト作成
// --------------------------------------

export function createBalanceTest({

    name="Balance Test"

}){


    const test={


        id:

        "balance_"

        +

        Date.now(),



        name,



        results:

        [],



        score:

        0,



        created:

        Date.now()



    };



    balances.push(

        test

    );



    saveBalances();



    return test;


}



// --------------------------------------
// 戦闘分析
// --------------------------------------

export function analyzeBattle({

    player,

    enemy

}){


    const powerRatio=

        player.atk /

        enemy.hp;



    let result=

        "normal";



    if(

        powerRatio > 1

    ){


        result=

        "easy";


    }



    if(

        powerRatio < 0.1

    ){


        result=

        "hard";


    }



    return {


        ratio:

        powerRatio,



        difficulty:

        result



    };


}



// --------------------------------------
// 報酬分析
// --------------------------------------

export function analyzeReward({

    reward,

    difficulty

}){


    const expected=

        difficulty * 100;



    return {


        reward,



        expected,



        difference:

        reward -

        expected



    };


}



// --------------------------------------
// 敵強度評価
// --------------------------------------

export function evaluateEnemy({

    hp,

    atk,

    level

}){


    const power=

        hp +

        atk * 10;



    return {


        level,



        power,



        rank:

        power > level * 1000

        ?

        "strong"

        :

        "normal"



    };


}



// --------------------------------------
// 調整案生成
// --------------------------------------

export function createBalanceSuggestion({

    result

}){


    const suggestions=[];



    if(

        result==="easy"

    ){


        suggestions.push(

            "敵HP増加",

            "敵攻撃力増加"

        );


    }



    if(

        result==="hard"

    ){


        suggestions.push(

            "報酬増加",

            "敵能力低下"

        );


    }



    return suggestions;


}



// --------------------------------------
// スコア計算
// --------------------------------------

export function calculateBalanceScore({

    issues,

    total

}){


    if(

        total===0

    )

        return 100;



    return Math.floor(

        (

            total -

            issues

        )

        /

        total *

        100

    );


}



// --------------------------------------
// 全履歴
// --------------------------------------

export function getBalanceTests(){


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

export function getBalanceTestAIInfo(){


    return {


        name:

        "Balance Test AI",



        version:

        "1.0",



        tests:

        balances.length


    };


}
