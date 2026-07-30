// ======================================
// GameForge AI
// ranking.js
// Search Ranking Engine
// ======================================



// --------------------------------------
// 設定
// --------------------------------------

const RankingConfig = {


    similarityWeight:0.6,


    freshnessWeight:0.2,


    importanceWeight:0.2


};



// --------------------------------------
// 新しさスコア
// --------------------------------------

function freshnessScore(

    timestamp

){


    if(!timestamp){

        return 0;

    }



    const age =

        Date.now()

        -

        timestamp;



    const day =

        1000 *

        60 *

        60 *

        24;



    const score =

        1 -

        age /

        (day*365);



    return Math.max(

        0,

        score

    );


}



// --------------------------------------
// キーワード重要度
// --------------------------------------

function importanceScore(

    item

){


    let score=0;



    const importantWords=[


        "battle",

        "enemy",

        "player",

        "system",

        "ai",

        "game",

        "data"


    ];



    const text =

        item.content

        .toLowerCase();



    importantWords.forEach(word=>{


        if(

            text.includes(word)

        ){

            score += 0.1;

        }


    });



    return Math.min(

        score,

        1

    );


}



// --------------------------------------
// 総合スコア
// --------------------------------------

export function calculateRank(

    item

){


    const similarity =

        item.score || 0;



    const freshness =

        freshnessScore(

            item.created

        );



    const importance =

        importanceScore(

            item

        );



    const total =


        similarity *

        RankingConfig.similarityWeight



        +

        freshness *

        RankingConfig.freshnessWeight



        +

        importance *

        RankingConfig.importanceWeight;



    return {


        ...item,


        rankingScore:

            total,


        detail:{


            similarity,


            freshness,


            importance


        }


    };


}



// --------------------------------------
// ランキング
// --------------------------------------

export function rankResults(

    results=[]

){


    return results

        .map(

            calculateRank

        )

        .sort(

            (a,b)=>

            b.rankingScore

            -

            a.rankingScore

        );


}



// --------------------------------------
// 上位取得
// --------------------------------------

export function topResults(

    results,

    limit=5

){


    return rankResults(

        results

    )

    .slice(

        0,

        limit

    );


}



// --------------------------------------
// 表示用
// --------------------------------------

export function rankingReport(

    results

){


    return rankResults(

        results

    )

    .map(

        (item,index)=>{


            return `

${index+1}位

${item.content}

Score:

${Math.floor(

item.rankingScore*100

)}%

`;

        }

    )

    .join("\n");


}



// --------------------------------------
// 設定変更
// --------------------------------------

export function setRankingWeight(

    similarity,

    freshness,

    importance

){


    RankingConfig.similarityWeight =

        similarity;


    RankingConfig.freshnessWeight =

        freshness;


    RankingConfig.importanceWeight =

        importance;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getRankingInfo(){


    return {


        name:

        "GameForge Ranking Engine",


        version:

        "1.0"


    };


}
