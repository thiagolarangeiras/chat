import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ComentarioGetDto, getComentarioPorTopico, getTopicoDetails, TopicoGetDto } from "../requests";

let pageComentario = 0;

// Identico ao Forum, Topico e Comentario so muda os tipos
export type PropsTopicoCardList1 = {
    dados: TopicoGetDto[] | any[] | undefined;
};

export function TopicoCardList1({ dados }: PropsTopicoCardList1) {
    return (
        <>
            {dados?.map((dado, index) => (
                <TopicoCard1 key={index} dados={dado} />
            ))}
        </>
    );
}

export type PropsTopicoCard1 = {
    dados: TopicoGetDto
}

export function TopicoCard1({ dados }: PropsTopicoCard1) {
    return (
        <Link to={`/topico/${dados.id}`}>
            <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
                <div className="m-2">
                    <h1>{dados.titulo}</h1>
                    <h6>{dados.corpo}</h6>
                </div>
                <button type="button" onClick={() => { deleteTopico(dados.id); }}>
                    Deletar
                </button>
            </div>
        </Link>
    );
}

export type PropsTopicoDetails1 = {
    topico: TopicoGetDto;
    comentarios?: ComentarioGetDto[];
}

export function TopicoDetails1({ topico, comentarios }: PropsTopicoDetails1) {
    return (
        <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
            <div className="m-2">
                <h1>{topico.id}</h1>
                <h1>{topico.corpo}</h1>
                <h6>{topico.data.toLocaleString()}</h6>
                <button type="button" onClick={() => { deleteTopico(topico.id); }}>
                    Deletar
                </button>
            </div>
            <ComentarioSecao idTopico={topico.id} />
            {/* <ComentarioCriar idNoticia={topico.id} /> */}
            {/* {comentarios ? <ComentarioCardList dados={comentarios} /> : <></>} */}
        </div>
    );
}

// import { useState } from 'react';
// import { postNoticia, noticiaDtoPost } from '../requests';

// export default function CriarNoticia() {
//     const [formData, setFormData] = useState({
//         autor: "",
//         titulo: "",
//         texto: "",
//     });

//     function subitForm(event) {
//         event.preventDefault();
//         const dados: noticiaDtoPost = {
//             autor: formData.autor,
//             titulo: formData.titulo,
//             texto: formData.texto,
//         }; 
//         postNoticia(dados);
//     }

//     return (
//         <form action="#" method="post" onSubmit={subitForm}>
//             <fieldset>
//                 <h3>Criar noticia</h3>
//                 <div>
//                     <label htmlFor="autor">Autor:</label>
//                     <input
//                         type="text"
//                         id="autor"
//                         value={formData.autor}
//                         onChange={(event) =>
//                             setFormData({ ...formData, autor: event.target.value })
//                         }
//                     />
//                 </div>
//                 <div >
//                     <label htmlFor="titulo">Titulo:</label>
//                     <input
//                         type="text"
//                         id="titulo"
//                         value={formData.titulo}
//                         onChange={(event) =>
//                             setFormData({ ...formData, titulo: event.target.value })
//                         }
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="texto">Texto:</label>
//                     <input
//                         type="text"
//                         id="texto"
//                         value={formData.texto}
//                         onChange={(event) =>
//                             setFormData({ ...formData, texto: event.target.value })
//                         }
//                     />
//                 </div>
//                 <button type="submit">
//                     Adicionar
//                 </button>
//             </fieldset>
//         </form>
//     );
// }

export default function TopicoScreen() {
    const { id } = useParams();
    if (id == undefined) return;
    const idTopico = parseInt(id);

    const [ topico, setTopico ] = useState<TopicoGetDto>();
    const [ comentarios , setComentarios ] = useState<ComentarioGetDto[]>();

    useEffect(() => {
        getTopicoDetails(idTopico).then((value)=> {
            setTopico(value);
        });
        getComentarioPorTopico(idTopico, pageComentario, 20).then((value)=>{
            setComentarios(value);
        });
    }, []);
    
    return (
        // (topico) ? <TopicoDetails topico={topico} comentarios={comentarios} /> : <></>
    <></>
    );
}