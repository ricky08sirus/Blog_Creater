import conf from "../conf/conf.js"
import { Client, Databases,Storage,Query } from "appwrite";


export class service{
    client = new Client();
    database;
    bucket; //folders are known as bucket


    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }
    // we created all documents ids as slug

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
            
        } catch (error) {
            console.log("Appwrite service :: getPost()::",error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            //actual content we need here
           return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
            
        } catch (error) {
            console.log("Appwrite service :: getPosts()::",error);
            return false
            
        }
        // two database operations getpost and getposts

        
    }

    async  createPost(title,slug,content,featuredImage,status,userId){
        // const databaseId = ; // Your database ID
        // const collectionId = 'your collection_id' //your collection ID
        const post = {
            title,
            slug,
            content,
            featuredImage,
            status,
            userId
        };

        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, post)

            return response

            
        } catch (error) {
            console.log("Appwrite service :: createPost()::",error)
            return false

            
        }
    

    }

    async updatePost(postId, title, slug, content, featuredImage, status, userId){
        const updatedPost = {
            title,
            slug,
            content,
            featuredImage,
            userId

        }
        try {
            const response = await this.database.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, updatedPost);

            return response

            
        } catch (error) {
            console.log("Appwrite service :: updatePost()::",error)
            return false
            
        }

    }
}

