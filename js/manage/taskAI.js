// ======================================
// GameForge AI
// taskAI.js
// Project Task Management AI
// ======================================



const TASK_KEY =

    "gameforge-task-history-v1";



let tasks =

    loadTasks();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadTasks(){


    const data =

        localStorage.getItem(

            TASK_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveTasks(){


    localStorage.setItem(

        TASK_KEY,

        JSON.stringify(

            tasks

        )

    );


}



// --------------------------------------
// タスク作成
// --------------------------------------

export function createTask({

    title="New Task",

    category="system",

    priority="normal"

}){


    const task={


        id:

        "task_"

        +

        Date.now(),



        title,



        category,



        priority,



        status:

        "waiting",



        progress:

        0,



        dependencies:

        [],



        created:

        Date.now()



    };



    tasks.push(

        task

    );



    saveTasks();



    return task;


}



// --------------------------------------
// 大規模機能分割
// --------------------------------------

export function breakdownFeature({

    feature,

    parts=[]

}){


    const result=[];



    parts.forEach(

        part=>{


            result.push(

                createTask({

                    title:

                    `${feature}: ${part}`,



                    category:

                    "feature"

                })

            );


        }

    );



    return result;


}



// --------------------------------------
// 優先度設定
// --------------------------------------

export function calculatePriority({

    importance,

    difficulty,

    deadline

}){


    let score =

        importance * 5

        -

        difficulty * 2;



    if(deadline){

        score += 10;

    }



    if(score >= 20){

        return "high";

    }



    if(score >= 10){

        return "normal";

    }



    return "low";


}



// --------------------------------------
// 進捗更新
// --------------------------------------

export function updateProgress(

    id,

    value

){


    const task =

        tasks.find(

            t=>

            t.id===id

        );



    if(!task)

        return null;



    task.progress =

        Math.min(

            100,

            Math.max(

                0,

                value

            )

        );



    if(task.progress===100){


        task.status=

        "complete";


    }



    saveTasks();



    return task;


}



// --------------------------------------
// 依存関係追加
// --------------------------------------

export function addDependency(

    taskId,

    dependencyId

){


    const task=

        tasks.find(

            t=>

            t.id===taskId

        );



    if(task){


        task.dependencies.push(

            dependencyId

        );


        saveTasks();


    }



    return task;


}



// --------------------------------------
// 制作ロードマップ生成
// --------------------------------------

export function createRoadmap(){

    
    return [

        {

            phase:"企画",

            progress:0

        },


        {

            phase:"システム制作",

            progress:0

        },


        {

            phase:"素材制作",

            progress:0

        },


        {

            phase:"テスト",

            progress:0

        },


        {

            phase:"公開",

            progress:0

        }

    ];


}



// --------------------------------------
// タスク分析
// --------------------------------------

export function analyzeTasks(){


    const total=

        tasks.length;



    const complete=

        tasks.filter(

            t=>

            t.status==="complete"

        ).length;



    return {


        total,



        complete,



        progress:

        total===0

        ?

        0

        :

        Math.floor(

            complete /

            total *

            100

        )



    };


}



// --------------------------------------
// 全タスク
// --------------------------------------

export function getTasks(){


    return tasks;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestTask(){


    return tasks[

        tasks.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getTaskAIInfo(){


    return {


        name:

        "Task AI",



        version:

        "1.0",



        tasks:

        tasks.length


    };


}
