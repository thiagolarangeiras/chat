import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComentarioGetDto, getComentarioDetails, getComentarioPorComentario } from '../requests';
import { ComentarioDetails } from '../components/Comentario';

let pageComentario = 0;

export default function ComentarioScreen(){
    const { id } = useParams();
    const idComentario = id ? parseInt(id) : -1;    
    
    const [ com, setCom ] = useState<ComentarioGetDto>();
    const [ comFilhos, setComFilhos ] = useState<ComentarioGetDto[]>();
    
    useEffect(() => {
        getComentarioDetails(idComentario).then((value)=> { 
            setCom(value); 
        });

        getComentarioPorComentario(idComentario, pageComentario, 20).then((value)=> { 
            setComFilhos(value); 
        });
    },[idComentario]);

    return(
        <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
            <div className="m-2">
                {
                    com 
                    ? <ComentarioDetails comentario={com} comentarioFilhos={comFilhos} /> 
                    : <></> 
                }
            </div>
        </div>
    );
}