import { useEffect, useState } from "react";
import { ForumGetDto, getForum } from "../requests";
import { ForumItem } from "../components/Forum";
import { Link } from "react-router-dom";

export default function ForumList(){
    const [ forum, setForum ] = useState<ForumGetDto[]>();
    let page = 0;
    useEffect(() => {
        getForum(page, 50).then((value)=> {
            setForum(value);
        });
    }, []);
    
    if (forum == undefined) return;

    return(
        forum?.map((forum, index) => (
            <Link to={`/forum/${forum.id}`}>
                <ForumItem key={index} forum={forum}/>
            </Link>
        ))
    )
}