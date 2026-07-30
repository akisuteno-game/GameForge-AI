// ======================================
// GameForge AI
// tools.js
// AI Tool System
// ======================================

import {
    addFile,
    updateFile,
    deleteFile,
    addFolder,
    getFile,
    getFiles,
    getProject
} from "./project.js";

import {
    searchKnowledge,
    projectSummary
} from "./rag.js";

// ----------------------------
// 利用可能ツール
// ----------------------------

export const ToolRegistry = {

    createFile,

    updateFileContent,

    removeFile,

    createFolder,

    readFile,

    searchProject,

    listFiles,

    getProjectInfo

};

// ----------------------------
// ファイル作成
// ----------------------------

function createFile(path, content=""){

    addFile(path,content);

    return {

        success:true,

        message:`Created ${path}`

    };

}

// ----------------------------
// 更新
// ----------------------------

function updateFileContent(path,content){

    updateFile(path,content);

    return {

        success:true,

        message:`Updated ${path}`

    };

}

// ----------------------------
// 削除
// ----------------------------

function removeFile(path){

    deleteFile(path);

    return {

        success:true,

        message:`Deleted ${path}`

    };

}

// ----------------------------
// フォルダ
// ----------------------------

function createFolder(path){

    addFolder(path);

    return {

        success:true,

        message:`Created folder ${path}`

    };

}

// ----------------------------
// 読み込み
// ----------------------------

function readFile(path){

    return getFile(path);

}

// ----------------------------
// 検索
// ----------------------------

function searchProject(query){

    return searchKnowledge(query);

}

// ----------------------------
// 一覧
// ----------------------------

function listFiles(){

    return getFiles();

}

// ----------------------------
// 情報
// ----------------------------

function getProjectInfo(){

    return {

        summary:projectSummary(),

        project:getProject()

    };

}

// ----------------------------
// AI Tool Call
// ----------------------------

export function executeTool(name,args={}){

    const tool=ToolRegistry[name];

    if(!tool){

        return{

            success:false,

            error:`Unknown tool : ${name}`

        };

    }

    try{

        return tool(...Object.values(args));

    }

    catch(e){

        return{

            success:false,

            error:e.message

        };

    }

}
