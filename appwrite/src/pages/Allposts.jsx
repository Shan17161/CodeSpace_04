import React, {useState, useEffect} from "react";
import {Container, PostCard} from '../components/index';
import service from "../appwrite/configure";

export default function Allposts(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{}, [])
    service.getPosts([]).then((posts)=>{
        if(posts){

            setPosts(posts.documents)
        }
})
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>{
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard post={post} />
                        </div>
                        })}
                </div>
            </Container>
        </div>
    )
}