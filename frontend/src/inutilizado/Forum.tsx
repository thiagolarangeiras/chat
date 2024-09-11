import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ForumGetDto, getForumDetails, getTopico, TopicoGetDto } from '../requests';
import { ForumDetails } from '../components/Forum';

let TopicoPage = 0;


// if (true){
//     return (
//         <>
//             <Navigate to="/login"/>
//         </>
//     )
// }

// return(<></>)

export default function ForumScreen(){
    const { id } = useParams();
    if (id == undefined) return;
    const idForum = parseInt(id);
    
    const [ forum, setForum ] = useState<ForumGetDto>();
    const [ topicos, setTopicos ] = useState<TopicoGetDto[]>();
    useEffect(() => {
        getForumDetails(idForum).then((value)=> { 
            setForum(value); 
        });

        getTopico(idForum,TopicoPage, 20).then((value)=> { 
            setTopicos(value); 
        });
        
    }, []);

    return(
        (forum && topicos) ? <ForumDetails forum={forum} topicos={topicos} /> : <></>
    );
}


import { Link } from "react-router-dom";
import { deleteForum, TopicoGetDto } from "../requests";
import { TopicoCardList } from "./Topico";

// Identico ao Forum, Topico e Comentario so muda os tipos
export type PropsForumCardList = {
    dados: ForumGetDto[] | any[] | undefined;
};

export function ForumCardList({ dados }: PropsForumCardList) {
    return (
        <>
        {dados?.map((dado, index) => (
            <ForumCard key={index} dados={dado} />
        ))}
        </>
    );
}

export type PropsForumCard = {
    dados: ForumGetDto
}

export function ForumCard({ dados }: PropsForumCard) {
    return (
        <Link to={`/forum/${dados.id}`}>
            <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
                <div className="m-2">
                    <h1>{dados.id}</h1>
                    <h1>{dados.nome}</h1>
                    <h6>{dados.descricao}</h6>
                </div>
                <button type="button" onClick={() => { deleteForum(dados.id); }}>
                    Deletar
                </button>
            </div>
        </Link>
    );
}

export type PropsForumDetails = {
    forum: ForumGetDto;
    topicos: TopicoGetDto[];
}

export function ForumDetails({ forum, topicos }: PropsForumDetails) {
    return (
        <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
            <div className="m-2">
                <h1>{forum.id}</h1>
                <h1>{forum.nome}</h1>
                <h6>{forum.descricao}</h6>
                <button type="button" onClick={() => { deleteForum(forum.id); }}>
                    Deletar
                </button>
            </div>
            {/* {topicos ? <TopicoCardList dados={topicos} /> : <></>} */}
        </div>
    );
}

