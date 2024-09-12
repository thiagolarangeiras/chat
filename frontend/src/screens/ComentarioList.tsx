import { useEffect, useState } from "react";
import { ComentarioGetDto, getComentario } from "../requests";
import { Link } from "react-router-dom";
import { ComentarioItem } from "../components/Comentario";

export default function ComentarioList(){
    const [ comentario, setComentario ] = useState<ComentarioGetDto[]>();

    let page = 0; 
    useEffect(() => {
        getComentario(page, 50).then((value)=> {
            setComentario(value);
        });
    }, []);
    
    if (comentario == undefined) return;

    return comentario?.map((com, index) => (
        <Link to={`/comentario/${com.id}`}>
            <ComentarioItem
                key={index}
                usuario={com.usuario?.nome}
                nome={com.usuario?.nome}
                texto={com.corpo}
                data={com.data}
            />
        </Link>
    ))
}