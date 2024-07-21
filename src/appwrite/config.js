import conf from "../conf/conf.js"
import { Client, Databases,Storage,Query,ID } from "appwrite";


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

  async deletePost(collectionId,slug){
    try {
      const response = await databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
      console.log("Document deleted successfully",response)


      
    } catch (error) {
      console.log("Appwrite service :: deletePost()::",error)
      return false
      
    }
  }

  //strorage service
  async uploadFile(filePath){
    try {
      const file = fs.createReadStream(filePath)
      const response = await storage.createFile(conf.appwriteBucketId,ID.unique(), file)
      //console.log("file uploaded successfully",response)
      return response

    } catch (error) {
      //console.error("error uploading file",error)
      console.log("Appwrite service :: uploadFile()::",error)
      return false


      
    }
  }
  async deleteFile(fileId){
    try {
      const response = await storage.deleteFile(conf.appwriteBucketId,fileId)
      return response

    } catch (error) {

      console.log("Appwrite service :: deletefile()::",error)
      return false

      
    }
  }

  async getFilePreview(fileId){
    try{
        const response = await storage.getFilePreview(conf.appwriteBucketId, fileId)
        console.log("file preview url:",response)
        return response


    }
    catch(error){
        console.log("Appwrite service :: getFilePreview()::",error)
        return false

    }


  }


}

const service = new Service()
export default service


