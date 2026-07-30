// ======================================
// GameForge AI
// commandAI.js
// Command Management AI
// ======================================



const COMMAND_KEY =

    "gameforge-command-history-v1";



let commands =

    loadCommands();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadCommands(){


    const data =

        localStorage.getItem(

            COMMAND_KEY

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

function saveCommands(){


    localStorage.setItem(

        COMMAND_KEY,

        JSON.stringify(

            commands

        )

    );


}



// --------------------------------------
// コマンド作成
// --------------------------------------

export function createCommand({

    name,

    target,

    params={}

}){


    const command={


        id:

        "command_"

        +

        Date.now(),



        name,



        target,



        params,



        status:

        "waiting",



        created:

        Date.now()



    };



    commands.push(

        command

    );



    saveCommands();



    return command;


}



// --------------------------------------
// 実行
// --------------------------------------

export function executeCommand(

    command

){


    if(!command)

        return null;



    command.status=

        "executed";



    command.executed=

        Date.now();



    saveCommands();



    return {


        success:

        true,



        command



    };


}



// --------------------------------------
// キャンセル
// --------------------------------------

export function cancelCommand(

    id

){


    const command=

        commands.find(

            c=>

            c.id===id

        );



    if(!command)

        return null;



    command.status=

        "cancelled";



    saveCommands();



    return command;


}



// --------------------------------------
// AI連携命令
// --------------------------------------

export function sendAICommand({

    ai,

    action,

    data={}

}){


    return createCommand({


        name:

        action,



        target:

        ai,



        params:

        data



    });


}



// --------------------------------------
// 自動処理フロー
// --------------------------------------

export function createWorkflow({

    name,

    steps=[]

}){


    return {


        id:

        "workflow_"

        +

        Date.now(),



        name,



        steps,



        status:

        "ready"



    };


}



// --------------------------------------
// ワークフロー実行
// --------------------------------------

export function runWorkflow(

    workflow

){


    const results=[];



    workflow.steps.forEach(

        step=>{


            results.push(

                executeCommand(

                    createCommand({

                        name:

                        step.name,



                        target:

                        step.target



                    })

                )

            );


        }

    );



    workflow.status=

        "completed";



    return results;


}



// --------------------------------------
// 待機中取得
// --------------------------------------

export function getWaitingCommands(){


    return commands.filter(

        c=>

        c.status==="waiting"

    );


}



// --------------------------------------
// 全コマンド
// --------------------------------------

export function getCommands(){


    return commands;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestCommand(){


    return commands[

        commands.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCommandAIInfo(){


    return {


        name:

        "Command AI",



        version:

        "1.0",



        commands:

        commands.length


    };


}
