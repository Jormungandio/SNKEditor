import { AddData, ViewData, Notes } from "../DataBaseReader";
import { Loading } from "../Loading";
import { useState, useEffect, useCallback } from "react";

import './Editor.css'

export function EditorText() {
    const [nameDB, setNameDB] = useState<Notes[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [nameFile, setNameFile] = useState("");
    const [textFile, setTextFile] = useState("");
    const [tagFile, setTagFile] = useState("");
    
    const AddDB = useCallback(() => {
        if (nameFile != '') {
            AddData(nameFile, textFile, tagFile);
            console.log("add")
        }
    }, [nameFile, textFile, tagFile]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await ViewData(nameFile);
            setNameDB(data);
            setLoading(false);
        };
        console.log(loading)
        fetchData();
    }, [AddDB]);

    
    return(
        <>
            <form onSubmit={(e) => { e.preventDefault(); AddDB();}}>
                <input type="text" onChange={(e) => setNameFile(e.currentTarget.value)}></input>
                <textarea onChange={(e) => setTextFile(e.currentTarget.value)}></textarea>
            </form>

            
        </>
    )

}