// ======================================
// GameForge AI
// agent.js
// AI Agent Controller
// ======================================

import { chat } from "./api.js";

import {
    buildPrompt,
    searchKnowledge
} from "./rag.js";

import {
    executeTool
} from "./tools.js";

import {
    addSummary
} from "./memory.js";

import {
    createPlan
} from "./planner.js";

import {
    executePlan
} from "./executor.js";


// --------------------------------------
// Agent設定
// --------------------------------------

const AgentConfig = {

    name:"GameForge AI",

    mode:"developer",

    maxSteps:10

};


// --------------------------------------
// メイン実行
// --------------------------------------

export async function runAgent(input,history=[]){

    try{


        // 1. コンテキスト検索

        const context =
            searchKnowledge(input);



        // 2. 計画作成

        const plan =
            await createPlan({

                input,

                context

            });



        // 3. 計画実行

        const results =
            await executePlan(plan);



        // 4. AI回答生成

        const prompt =
            buildPrompt(input);



        const response =
            await chat([

                ...history,

                {

                    role:"user",

                    content:prompt

                }

            ]);



        // 5. 記憶保存

        addSummary(

`ユーザー:
${input}

実行:
${JSON.stringify(results)}

回答:
${response}`

        );



        return {

            success:true,

            answer:response,

            plan,

            results

        };


    }catch(error){


        return {

            success:false,

            error:error.message

        };


    }

}



// --------------------------------------
// Tool直接実行
// --------------------------------------

export function useTool(name,args){

    return executeTool(

        name,

        args

    );

}



// --------------------------------------
// Agent情報
// --------------------------------------

export function getAgentInfo(){

    return {

        name:AgentConfig.name,

        mode:AgentConfig.mode,

        maxSteps:AgentConfig.maxSteps

    };

}
