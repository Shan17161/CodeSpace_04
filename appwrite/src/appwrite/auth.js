import config from "../cofig/config";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    Client = new Client()
    account;

    constructor(){
        this.Client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.account = new Account(this.Client)

    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password)
            if(userAccount){
                return this.login({email, password})
            }
            else{
                return null
            }
        }
        catch(error){
            throw error
        }
    }

    async login({email, password}){
        try{

            const session = await this.account.createEmailPasswordSession(email, password)
            return session
        }
        catch(error){
            throw error
        }
    }

    async getAccount(){
        try{

            return await this.account.get()
        }
        catch(error){
            console.log("Appwrite service can't get Account")
        }
        return null
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }
        catch(error){
            console.log("Appwrite Logout error")
        }
    }
}

AuthService = new AuthService()

export default AuthService



