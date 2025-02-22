//integrating the auth section
import conf from "../conf/conf.js"
//put the repeatable objects in class and use constructor

import { Client, Account,ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                return this.login({email,password})
                
            } else {
                return userAccount
                
            }            
        } catch (error) {
            throw error
            
        }
    }
    //while building methods use try catch
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
            throw error
            
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser()::",error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout()::",error);
        }
    }

}

const authService = new AuthService()

export default authService
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);
