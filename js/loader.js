// ======================================
// GameForge AI
// loader.js
// Full Module Loader
// ======================================


const modules = [


    // ==========================
    // Core AI
    // ==========================

    "./ai/coreAI/masterAI.js",
    "./ai/coreAI/systemManagerAI.js",
    "./ai/coreAI/decisionAI.js",
    "./ai/coreAI/commandAI.js",



    // ==========================
    // Game AI
    // ==========================

    "./ai/assetAI.js",
    "./ai/balanceAI.js",
    "./ai/battleAI.js",
    "./ai/gameDesignerAI.js",
    "./ai/levelDesignAI.js",
    "./ai/storyAI.js",



    // ==========================
    // Balance
    // ==========================

    "./balance/difficultyAI.js",
    "./balance/economyAI.js",
    "./balance/enemyBalanceAI.js",
    "./balance/rewardAI.js",



    // ==========================
    // Engine
    // ==========================

    "./engine/3dSystemAI.js",
    "./engine/animationAI.js",
    "./engine/physicsAI.js",
    "./engine/shaderAI.js",



    // ==========================
    // Generator
    // ==========================

    "./generator/codeGeneratorAI.js",
    "./generator/contentGeneratorAI.js",
    "./generator/dungeonGeneratorAI.js",
    "./generator/questGeneratorAI.js",



    // ==========================
    // Learning
    // ==========================

    "./learning/evolutionAI.js",
    "./learning/feedbackAI.js",
    "./learning/improvementAI.js",
    "./learning/learningAI.js",



    // ==========================
    // Manage
    // ==========================

    "./manage/documentAI.js",
    "./manage/scheduleAI.js",
    "./manage/taskAI.js",
    "./manage/teamAI.js",



    // ==========================
    // Media
    // ==========================

    "./media/characterAI.js",
    "./media/imagePromptAI.js",
    "./media/monsterAI.js",
    "./media/soundAI.js",



    // ==========================
    // Network
    // ==========================

    "./network/analyticsAI.js",
    "./network/backupAI.js",
    "./network/cloudAI.js",
    "./network/syncAI.js",



    // ==========================
    // Testing
    // ==========================

    "./testing/balanceTestAI.js",
    "./testing/bugDetectAI.js",
    "./testing/performanceAI.js",
    "./testing/testAI.js",



    // ==========================
    // Tools
    // ==========================

    "./agent.js",
    "./analyzer.js",
    "./autocomplete.js",
    "./balance.js",
    "./branch.js",
    "./bugFixer.js",
    "./commitAI.js",
    "./context.js",
    "./dashboard.js",
    "./dependency.js",
    "./deployAI.js",
    "./diff.js",
    "./enemyAI.js",
    "./executor.js",
    "./fileCreator.js",
    "./formatter.js",
    "./git.js",
    "./githubAPI.js",
    "./history.js",
    "./memory.js",
    "./planner.js",
    "./project.js",
    "./projectBuilder.js",
    "./projectUI.js",
    "./questAI.js",
    "./rag.js",
    "./ranking.js",
    "./stream.js",
    "./systemMaker.js",
    "./tester.js",
    "./tree.js",
    "./vector.js",
    "./versionAI.js",
    "./workspace.js"


];





export async function loadAllAI(){


    const result=[];



    for(
        const module of modules
    ){


        try{


            await import(module);



            result.push({

                file:module,

                status:"loaded"

            });



        }
        catch(error){


            result.push({

                file:module,

                status:"error",

                message:
                error.message

            });



        }


    }



    return result;


}
