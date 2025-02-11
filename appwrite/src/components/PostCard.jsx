import React from "react";
import service from "../appwrite/configure";
import {Link} from 'react-router-dom'
export default function PostCard({
    $id, // $id WE NEED TO WRITE ID AS $ID IF WE ARE TAKING OR PASIING THE ID TO APPWRITE
    title,
    featuredImage,
}){
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={service.getFilePreview(featuredImage)} alt={title}
                    className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">
                    {title}
                </h2>
            </div>
        </Link>
    )
}