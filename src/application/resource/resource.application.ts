import { IResourceDomain } from "../../domain";
export class ResourceApplication {
    constructor(private readonly resourceDomain: IResourceDomain) {}
    async getResources() {
        return await this.resourceDomain.getResource();
    }
    async getResource(id: number) {
        return await this.resourceDomain.getResource(id);
    }
    async addResource(resource: any) {
        return await this.resourceDomain.addResource(resource);
    }
    async updateResource(resource: any) {
        return await this.resourceDomain.updateResource(resource);
    }
}