import { Link } from "react-router-dom";
import { ComentarioGetDto, ComentarioPostDto, deleteComentario, getComentarioPorComentario, getComentarioPorTopico, postComentario } from "../requests";
import { useEffect, useState } from "react";

type PropsComentarioCardList = {
    dados: ComentarioGetDto[] | undefined;
};

export function ComentarioCardList({ dados }: PropsComentarioCardList) {
    return (
        <>
            {dados?.map((dado, index) => (
                <ComentarioCard key={index} dados={dado} />
            ))}
        </>
    );
}

type PropsComentarioCard = {
    dados: ComentarioGetDto
};

export function ComentarioCard({ dados }: PropsComentarioCard) {
    return (
        <Link to={`/comentario/${dados.id}`}>
            <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
                <div className="m-2">
                    <h1>{dados.idUsuario}</h1>
                    <h6>{dados.data.toLocaleString()}</h6>
                    <h6>{dados.corpo}</h6>
                </div>
                <button type="button" onClick={() => { deleteComentario(dados.id); }}>
                    Deletar
                </button>
            </div>
        </Link>
    );
}

type PropsComentarioDetails = {
    comentario: ComentarioGetDto;
    comentarioFilhos?: ComentarioGetDto[];
}

export function ComentarioDetails({ comentario, comentarioFilhos }: PropsComentarioDetails) {
    return (
        <div className="border p-3 mb-3 d-flex flex-row justify-content-between">
            <div className="m-2">
                <h1>{comentario.idUsuario}</h1>
                <h6>{comentario.data.toLocaleString()}</h6>
                <h6>{comentario.corpo ?? "[Removido]"}</h6>
                <button type="button" onClick={() => { deleteComentario(comentario.id); }}>
                    Deletar
                </button>
            </div>
            {/* <ComentarioCriar idNoticia={topico.id} /> */}
            {comentarioFilhos ? <ComentarioCardList dados={comentarioFilhos} /> : <></>}
        </div>
    );
}

// import { useState } from 'react';
// import { postComentario, ComentarioPostDto } from '../requests';

// export default function ComentarioCriar({ idNoticia }) {
//     const [formData, setFormData] = useState({
//         usuario: "",
//         texto: "",
//     });

//     function subitForm(event) {
//         event.preventDefault();
//         const dados: comentarioDtoPost = {
//             usuario: formData.usuario, 
//             texto: formData.texto,
//         }; 
//         postComentario(idNoticia, dados);
//     }

//     return (
//         <form action="#" method="post" onSubmit={subitForm}>
//         <fieldset>
//             <h3>Criar Comentario</h3>
//             <div>
//                 <label htmlFor="usuario">Usuario:</label>
//                 <input
//                     type="text"
//                     id="usuario"
//                     value={formData.usuario}
//                     onChange={(event) =>
//                         setFormData({ ...formData, usuario: event.target.value })
//                     }
//                 />
//             </div>
//             <div >
//                 <label htmlFor="texto">Texto:</label>
//                 <input
//                     type="text"
//                     id="texto"
//                     value={formData.texto}
//                     onChange={(event) =>
//                         setFormData({ ...formData, texto: event.target.value })
//                     }
//                 />
//             </div>
//             <button type="submit">
//                 Adicionar
//             </button>
//         </fieldset>
//         </form>
//     );
// }
