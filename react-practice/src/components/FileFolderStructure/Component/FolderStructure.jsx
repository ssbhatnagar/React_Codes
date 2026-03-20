import React, {Children, useState} from "react"
import json from '../Data/data.json'
import Styles from '../CSS/FolderStructure.module.css'
import List from '../Component/List.jsx'

/**
 * Nested File folder Structure
 * expand and collapse folder
 * add/remove file/folder
 * 
 */

function FolderStructure(){

    const [data, setData] = useState(json);
    


    function addNewFolder(parentId){

        const folderName = prompt("Enter new folder name"); 
        function updateTree(list){
            return list.map((node) =>{
                if(node.id === parentId){
                    return{
                        ...node,
                        children: [
                            ...node.children,
                            {id: Date.now(), name: folderName, isFolder: true, children: [] } 
                        ], 
                    };
                }
                if(node.children){
                    return {...node, children: updateTree(node.children)}
                }
                return node;
            })
        }
        setData((prev) => updateTree(prev))

    }

    function deleteNodeFromList(itemID){
        function updateTree(list){
            return list.filter((node) => node.id !== itemID).map((node) =>
            {
                if(node.children){
                    return{...node, children: updateTree(node.children)}
                }
                return node;
            });
        }
        setData((prev) => updateTree(prev))
    }

    return(
        <div>
            <h1>File /Folder Structure</h1>
            <List
            data={data}
            addNewFolder={addNewFolder}
            deleteNodeFromList={deleteNodeFromList}
            />
        </div>
    )

}
export default FolderStructure