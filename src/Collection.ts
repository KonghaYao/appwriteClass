import { type Databases, ID, type Models } from "appwrite";
import { getOriginAppwriteData } from "./omit";

export class Collection<ModelType> {
    constructor(
        public databases: Databases,
        public databaseId: string,
        public collectionId: string
    ) {}

    listDocuments(queries?: string[]) {
        return this.databases.listDocuments<ModelType & Models.Document>(
            this.databaseId,
            this.collectionId,
            queries
        );
    }

    async createOrUpdateDocument(
        data: ModelType & { $id?: string },
        permissions?: string[]
    ) {
        if (data.$id) {
            return this.updateDocument(
                data as ModelType & { $id: string },
                permissions
            );
        } else {
            return this.createDocument(data, permissions);
        }
    }
    async createDocument(data: ModelType, permissions?: string[]) {
        return this.databases.createDocument<ModelType & Models.Document>(
            this.databaseId,
            this.collectionId,
            ID.unique(),
            data as ModelType & Models.Document,
            permissions
        );
    }

    async getDocument(documentId: string, queries?: string[]) {
        return this.databases.getDocument<ModelType & Models.Document>(
            this.databaseId,
            this.collectionId,
            documentId,
            queries
        );
    }
    async updateDocument(
        data: { $id: string } & Partial<ModelType>,
        permissions?: string[]
    ) {
        return this.databases.updateDocument<ModelType & Models.Document>(
            this.databaseId,
            this.collectionId,
            data.$id,
            /** @ts-ignore */
            getOriginAppwriteData(data),
            permissions
        );
    }

    async deleteDocument(documentId: string) {
        return this.databases.deleteDocument(
            this.databaseId,
            this.collectionId,
            documentId
        );
    }
}
