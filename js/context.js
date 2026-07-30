// ======================================
// GameForge AI
// context.js
// AI Context Manager
// ======================================


import {
    getMemory
} from "./memory.js";


import {
    getProject
} from "./project.js";


import {
    searchKnowledge
} from "./rag.js";



// --------------------------------------
// Context設定
// --------------------------------------

const ContextConfig = {

    maxHistory:20,

    maxSearchResults:10

};



// --------------------------------------
// 履歴整理
// --------------------------------------

function cleanHistory(history=[]){


    if(
        history.length <= ContextConfig.maxHistory
    ){

        return history;

    }


    return history.slice(

        -ContextConfig.maxHistory

    );


}



// --------------------------------------
// プロジェクト情報
// --------------------------------------

function projectContext(){


    const project =
        getProject();



    return {


        name:
        project.name,


        version:
        project.version,


        engine:
        project.engine,


        files:
        project.files.map(

            file=>file.path

        ),


        folders:
        project.folders


    };


}



// --------------------------------------
// メモリ情報
// --------------------------------------

function memoryContext(){


    const memory =
        getMemory();



    return {


        facts:
        memory.facts,


        preferences:
        memory.preferences,


        summaries:
        memory.summaries.slice(-5)


    };


}



// --------------------------------------
// RAG情報
// --------------------------------------

function knowledgeContext(query){


    return searchKnowledge(query)

        .slice(
            0,
            ContextConfig.maxSearchResults
        );

}



// --------------------------------------
// 全Context生成
// --------------------------------------

export function buildContext({

    input="",

    history=[]

}){


    return {


        userInput:

            input,


        history:

            cleanHistory(history),



        project:

            projectContext(),



        memory:

            memoryContext(),



        knowledge:

            knowledgeContext(input),



        created:

            Date.now()


    };


}



// --------------------------------------
// AI Prompt用変換
// --------------------------------------

export function contextToPrompt(context){


return `

# GameForge AI Context


## Project

${JSON.stringify(
    context.project,
    null,
    2
)}



## Memory

${JSON.stringify(
    context.memory,
    null,
    2
)}



## Related Knowledge

${JSON.stringify(
    context.knowledge,
    null,
    2
)}



## Conversation

${JSON.stringify(
    context.history,
    null,
    2
)}



## User Request

${context.userInput}


`;

}



// --------------------------------------
// Context比較
// --------------------------------------

export function compareContext(

    oldContext,

    newContext

){


    return {


        projectChanged:

            JSON.stringify(
                oldContext.project
            )
            !==
            JSON.stringify(
                newContext.project
            ),



        memoryChanged:

            JSON.stringify(
                oldContext.memory
            )
            !==
            JSON.stringify(
                newContext.memory
            )


    };


}



// --------------------------------------
// Context情報
// --------------------------------------

export function getContextInfo(){


    return {


        historyLimit:
        ContextConfig.maxHistory,


        searchLimit:
        ContextConfig.maxSearchResults


    };


}
