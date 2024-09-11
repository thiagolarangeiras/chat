import { useEffect, useState } from "react";
import { TopicoItem } from "../components/Topico";
import { ForumGetDto, getForumDetails, getTopico, TopicoGetDto } from "../requests";
import { Link, useParams } from "react-router-dom";
import { ForumDetails } from "../components/Forum";

export default function Forum(){
    const { id } = useParams();
    if (id == undefined) return;
    const idForum = parseInt(id);

    const [ forum, setForum ] = useState<ForumGetDto>();
    const [topicos, setTopicos] = useState<TopicoGetDto[]>();

    useEffect(() => {
        getForumDetails(idForum).then((value)=> {
            setForum(value);
        });
        getTopico(idForum, 0, 50).then((value) => {
            setTopicos(value);
        });
    }, []);
    
    if (forum == undefined) return;
    return(
        <>
            <ForumDetails forum={forum} />
            <div className="space-y-4 p-3">
                {topicos?.map((top, index) => (
                    <Link to={`/topico/${top.id}`}>
                        <TopicoItem key={index} topico={top} />
                    </Link>
                ))}
            </div>
        </>
    )
}