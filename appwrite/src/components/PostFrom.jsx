import React, {useCallback} from "react";
import { useForm } from "react-hook-form";
import {Button ,Input, Select, RTE} from '../components/index'
import appwriteService from "../appwrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({post}){
    const navigate = useNavigate();
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const userData = useSelector((state)=>state.auth.userData)

    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined

            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }else{
                const file = await appwriteService.updateFile(data.image[0])
                if (file){
                    const fileId = file.$id;
                }
            }
        }
    }
    return(<></>)
}