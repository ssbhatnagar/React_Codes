import { useState } from 'react'
import Styles from '../CSS/FolderStructure.module.css'

function List({ data, addNewFolder, deleteNodeFromList }) {

    const [isExpanded, setIsExpanded] = useState({})

    function handleExpandCollapse(node){
        setIsExpanded((prev) =>(
            {
                ...prev,
                [node.name] : !prev[node.name]
            }
        )
        )
    }

    return (
        <div>
            <div className={Styles.container}>
                {data.map((node) =>
                    <div key={node.id}>
                        
                       {node.isFolder && <span 
                       onClick={() => 
                        handleExpandCollapse(node)}> 
                       {isExpanded?.[node.name] ? "-" : "+"}</span>}
                        <span>{node.name}</span>
                        {node.isFolder && <button onClick={() => addNewFolder(node.id)} >add folder</button>}
                        <button onClick={() => deleteNodeFromList(node.id)} >delete</button>
                       { isExpanded?.[node.name] && node ?.children &&  <List data={node.children} addNewFolder={addNewFolder} deleteNodeFromList={deleteNodeFromList} /> }
                    </div>

                )}
            </div>
        </div>
    )

}

export default List