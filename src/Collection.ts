import { type Databases, ID, type Models } from "appwrite";


export class Collection<ModelType extends Models.Document> {
    constructor(
        public databases: Databases,
        public databaseId: string,
        public collectionId: string
    ) { }
    
    listDocuments(queries?: string[]) {
        return this.databases.listDocuments<ModelType>(this.databaseId, this.collectionId, queries);
    }

    async createDocument(data: ModelType, permissions?: string[]) {
        return this.databases.createDocument<ModelType>(
            this.databaseId,
            this.collectionId,
            ID.unique(),
            data,
            permissions
        );
    }

    async getDocument(documentId: string, queries?: string[]) {
        return this.databases.getDocument<ModelType>(
            this.databaseId,
            this.collectionId,
            documentId,
            queries
        );
    }
    async updateDocument(data: { $id: string; } & Partial<ModelType>, permissions?: string[]) {
        return this.databases.updateDocument<ModelType>(
            this.databaseId,
            this.collectionId,
            data.$id,
            data,
            permissions
        );
    }

    async deleteDocument(documentId: string) {
        return this.databases.deleteDocument(this.databaseId, this.collectionId, documentId);
    }
}
