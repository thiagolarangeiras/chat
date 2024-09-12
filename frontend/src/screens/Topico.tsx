import { useEffect, useState } from "react";
import { TopicoDetails } from "../components/Topico";
import { ComentarioGetDto, getComentarioPorTopico, getTopicoDetails, TopicoGetDto } from "../requests";
import { Link, useParams } from "react-router-dom";
import { ComentarioForm, ComentarioItem } from "../components/Comentario";

export default function Topico(){
    const { id } = useParams();
    if (id == undefined) return;
    const idTopico = parseInt(id);

    const [ topico, setTopico ] = useState<TopicoGetDto>();
    const [comentarios, setComentarios] = useState<ComentarioGetDto[]>();

    let page = 0;
    useEffect(() => {
        getTopicoDetails(idTopico).then((value)=> {
            setTopico(value);
        });
        getComentarioPorTopico(idTopico, page, 50).then((value) => {
            setComentarios(value);
        });
    }, []);
    
    if (topico == undefined) return;
    return(
        <>
            <TopicoDetails topico={topico} />
            <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Comentários</h2>
                <ComentarioForm idTopico={topico.id}/>
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