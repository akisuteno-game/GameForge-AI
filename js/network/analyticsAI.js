// ======================================
// GameForge AI
// analyticsAI.js
// Player Analytics AI
// ======================================



const ANALYTICS_KEY =

    "gameforge-analytics-history-v1";



let analytics =

    loadAnalytics();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadAnalytics(){


    const data =

        localStorage.getItem(

            ANALYTICS_KEY

        );



    return data

        ? JSON.parse(

            data

        )

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveAnalytics(){


    localStorage.setItem(

        ANALYTICS_KEY,

        JSON.stringify(

            analytics

        )

    );


}



// --------------------------------------
// プレイヤー分析作成
// --------------------------------------

export function createAnalytics({

    player="unknown"

}){


    const data={


        id:

        "analytics_"

        +

        Date.now(),



        player,



        sessions:

        [],



        actions:

        {},



        playTime:

        0,



        created:

        Date.now()



    };



    analytics.push(

        data

    );



    saveAnalytics();



    return data;


}



// --------------------------------------
// 行動記録
// --------------------------------------

export function recordAction({

    profile,

    action

}){


    profile.sessions.push({


        action,



        time:

        Date.now()



    });



    if(

        !profile.actions[action]

    ){


        profile.actions[action]=0;


    }



    profile.actions[action]++;



    saveAnalytics();



    return profile;


}



// --------------------------------------
// 人気機能分析
// --------------------------------------

export function analyzePopularFeatures(){


    const result={};



    analytics.forEach(

        data=>{


            Object.keys(

                data.actions

            ).forEach(

                key=>{


                    if(

                        !result[key]

                    ){


                        result[key]=0;


                    }



                    result[key]+=

                    data.actions[key];


                }

            );


        }

    );



    return Object.entries(

        result

    )

    .sort(

        (

            a,

            b

        )=>

        b[1]-a[1]

    );


}



// --------------------------------------
// プレイスタイル分析
// --------------------------------------

export function analyzePlayStyle(

    profile

){


    const actions=

        profile.actions;



    const battle=

        actions.battle || 0;



    const explore=

        actions.explore || 0;



    if(

        battle >

        explore

    ){


        return "fighter";


    }



    if(

        explore >

        battle

    ){


        return "explorer";


    }



    return "balanced";


}



// --------------------------------------
// 離脱分析
// --------------------------------------

export function detectDropOff({

    lastPlayTime,

    averagePlayTime

}){


    if(

        lastPlayTime <

        averagePlayTime *

        0.3

    ){


        return {


            status:

            "risk",



            reason:

            "short_session"



        };


    }



    return {


        status:

        "normal"



    };


}



// --------------------------------------
// 継続率計算
// --------------------------------------

export function calculateRetention({

    active,

    total

}){


    if(

        total===0

    )

        return 0;



    return Math.floor(

        active /

        total *

        100

    );


}



// --------------------------------------
// レポート生成
// --------------------------------------

export function createAnalyticsReport(){


    return {


        players:

        analytics.length,



        popular:

        analyzePopularFeatures(),



        generated:

        Date.now()



    };


}



// --------------------------------------
// 全分析
// --------------------------------------

export function getAnalytics(){


    return analytics;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestAnalytics(){


    return analytics[

        analytics.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getAnalyticsAIInfo(){


    return {


        name:

        "Analytics AI",



        version:

        "1.0",



        profiles:

        analytics.length


    };


}
