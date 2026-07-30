// ======================================
// GameForge AI
// scheduleAI.js
// Development Schedule Management AI
// ======================================



const SCHEDULE_KEY =

    "gameforge-schedule-history-v1";



let schedules =

    loadSchedules();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadSchedules(){


    const data =

        localStorage.getItem(

            SCHEDULE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveSchedules(){


    localStorage.setItem(

        SCHEDULE_KEY,

        JSON.stringify(

            schedules

        )

    );


}



// --------------------------------------
// スケジュール作成
// --------------------------------------

export function createSchedule({

    project="Game Project",

    days=100

}){


    const schedule={


        id:

        "schedule_"

        +

        Date.now(),



        project,



        days,



        phases:

        createPhases(

            days

        ),



        progress:

        0,



        status:

        "developing",



        created:

        Date.now()



    };



    schedules.push(

        schedule

    );



    saveSchedules();



    return schedule;


}



// --------------------------------------
// フェーズ生成
// --------------------------------------

function createPhases(

    days

){


    const unit =

        Math.floor(

            days / 5

        );



    return [


        {


            name:

            "企画",



            days:

            unit,



            progress:

            0



        },



        {


            name:

            "システム制作",



            days:

            unit * 2,



            progress:

            0



        },



        {


            name:

            "素材制作",



            days:

            unit,



            progress:

            0



        },



        {


            name:

            "テスト",



            days:

            unit,



            progress:

            0



        },



        {


            name:

            "公開準備",



            days:

            unit,



            progress:

            0



        }



    ];


}



// --------------------------------------
// 進捗更新
// --------------------------------------

export function updateScheduleProgress(

    schedule,

    value

){


    schedule.progress =

        Math.min(

            100,

            Math.max(

                0,

                value

            )

        );



    if(

        schedule.progress===100

    ){


        schedule.status=

        "complete";


    }



    saveSchedules();



    return schedule;


}



// --------------------------------------
// 完成予測
// --------------------------------------

export function predictCompletion({

    currentProgress,

    elapsedDays

}){


    if(

        currentProgress<=0

    ){


        return null;


    }



    const speed =

        currentProgress /

        elapsedDays;



    const remaining =

        100 -

        currentProgress;



    return {


        remainingDays:

        Math.ceil(

            remaining /

            speed

        ),



        speed



    };


}



// --------------------------------------
// 遅延チェック
// --------------------------------------

export function checkDelay({

    progress,

    expected

}){


    if(

        progress < expected

    ){


        return {


            status:

            "delay",



            difference:

            expected -

            progress



        };


    }



    return {


        status:

        "on_schedule",



        difference:

        progress -

        expected



    };


}



// --------------------------------------
// リリース計画
// --------------------------------------

export function createReleasePlan({

    version="1.0"

}){


    return {


        version,



        checklist:

        [


            "バグ確認",

            "性能確認",

            "UI確認",

            "最終調整",

            "公開"



        ],



        status:

        "preparing"



    };


}



// --------------------------------------
// 全スケジュール
// --------------------------------------

export function getSchedules(){


    return schedules;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestSchedule(){


    return schedules[

        schedules.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getScheduleAIInfo(){


    return {


        name:

        "Schedule AI",



        version:

        "1.0",



        schedules:

        schedules.length


    };


}
