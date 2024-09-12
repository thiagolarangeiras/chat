import { useEffect, useState } from "react";
import { ComentarioGetDto, getComentarioDetails, getComentarioPorComentario } from "../requests";
import { Link, useParams } from "react-router-dom";
import { ComentarioDetails, ComentarioForm, ComentarioItem } from "../components/Comentario";

export default function Comentario(){
    const { id } = useParams();
    if (id == undefined) return;
    const idComentario = parseInt(id);

    const [ comentarioPai, setComentarioPai ] = useState<ComentarioGetDto>();
    const [comentarios, setComentarios] = useState<ComentarioGetDto[]>();
    let page = 0;
    useEffect(() => {
        getComentarioDetails(idComentario).then((value)=> {
            setComentarioPai(value);
        });
        getComentarioPorComentario(idComentario, page, 50).then((value) => {
            setComentarios(value);
        });
    }, [idComentario]);
    
    if (comentarioPai == undefined) return;
    return(
        <>
            <ComentarioDetails
                idTopico={comentarioPai.idTopico || undefined}
                idComentario={comentarioPai.idComentarioPai || undefined}
                data={comentarioPai.data} 
                nome={comentarioPai.usuario?.nome} 
                usuario={comentarioPai.usuario?.email} 
                texto={comentarioPai.corpo}
                avatar={undefined} 
            />
            <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Comentários</h2>
                <ComentarioForm idComentario={comentarioPai.id}/>
                <div className="space-y-4">
                    {comentarios?.map((com, index) => (
                        <Link to={`/comentario/${com.id}`}>
                            <ComentarioItem
                                key={index}
                                usuario={com.usuario?.nome}
                                nome={com.usuario?.nome}
                                texto={com.corpo}
                                data={com.data}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}