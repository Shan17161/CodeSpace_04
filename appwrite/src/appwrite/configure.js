import config from "../config/config";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log("error in Appwrite createpost: ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteProjectId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status

                }
            )
        }
        catch(error){
            console.log("Error in appwrite updatePost: ", error)
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug
            )
            return true
        }
        catch(error){
            console.log("Error in appwrite deletePost: ", error)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteProjectId,
                config.appwritecollectionId,
                slug
            )
        }
        catch(error){
            console.log("Error in Appwrite getPost: ", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // File Services

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwritebucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Error in uploadFile: ", error)
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwritebucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("Error in Appwrite deleteFile: ", error)
            return false
        }
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                config.appwritebucketId,
                fileId
            )
        }
        catch(error){
            console.log("Error in Appwrite getFilePreview: ", error)
            return false
        }
    }
}

const service = new Service() 

export default service