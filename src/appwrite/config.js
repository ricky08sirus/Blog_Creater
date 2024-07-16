import conf from "../conf/conf.js"
import { Client, Databases,Storage,Query } from "appwrite";


export class service{
    client = new Client();
    database;
    bucket;

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
}

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const databases = new Databases(client);

const result = await databases.listDocuments(
    '<DATABASE_ID>', // databaseId
    '<COLLECTION_ID>', // collectionId
    [] // queries (optional)
);

console.log(response);
