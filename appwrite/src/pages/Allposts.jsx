import React, {useState, useEffect} from "react";
import {container, PostCard} from '../components/index';
import service from "../appwrite/configure";

function Allposts(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{}, [])
    service.getPosts([]).then((posts)=>{
        if(posts){

            setPosts(posts.documents)
        }
})
    return(
        <div className="w-full py-8">
            <container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>{
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard post={post} />
                        </div>
                        })}
                </div>
            </container>
        </div>
    )
}