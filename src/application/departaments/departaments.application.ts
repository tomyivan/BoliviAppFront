import { IDepartamentsDomain } from "../../domain";

export class DepartamentsApplication {
    constructor(private departamentsDomain: IDepartamentsDomain) {}
    getDepartaments() {
        return  this.departamentsDomain.getDepartaments();
    }
}