import { useEffect, useState } from "react";
import { getTopico, TopicoGetDto } from "../requests";
import { Link } from "react-router-dom";
import { TopicoItem } from "../components/Topico";

export default function TopicoList(){
    const [ topico, setTopico ] = useState<TopicoGetDto[]>();

    useEffect(() => {
        getTopico(1, 0, 50).then((value)=> {
            setTopico(value);
        });
    }, []);
    
    if (topico == undefined) return;

    return topico?.map((topico, index) => (
        <Link to={`/topico/${topico.id}`}>
            <TopicoItem key={index} topico={topico}/>
        </Link>
    ))
}