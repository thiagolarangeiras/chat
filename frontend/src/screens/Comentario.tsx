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

    useEffect(() => {
        getComentarioDetails(idComentario).then((value)=> {
            setComentarioPai(value);
        });
        getComentarioPorComentario(idComentario, 0, 20).then((value) => {
            setComentarios(value);
        });
    }, []);
    
    if (comentarioPai == undefined) return;
    return(
        <>
            <ComentarioDetails 
                data={comentarioPai.data} 
                nome={comentarioPai.usuario?.nome} 
                usuario={comentarioPai.usuario?.email} 
                texto={comentarioPai.corpo} 
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