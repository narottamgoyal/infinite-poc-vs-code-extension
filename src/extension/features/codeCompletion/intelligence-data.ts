import { IIntelligence, IntelligenceType } from "./intelligence-type";

export const intelligencePayload: Array<IIntelligence> = [{
    name: "Demo",
    Doc: "POC demo",
    type: IntelligenceType.Class,
    child: [{
        Doc: "Demo name",
        name: "Name",
        type: IntelligenceType.Property,
        returnType: "String"
    }, {
        Doc: "Demo details",
        name: "Details(field: string)",
        type: IntelligenceType.Method,
        returnType: "Detail",
        child: [{
            name: "IsValid",
            Doc: "is it valid",
            type: IntelligenceType.Property,
            returnType: "Boolean"
        }, {
            name: "Id",
            Doc: "Identifier",
            type: IntelligenceType.Property,
            returnType: "number"
        }]
    }]
}, {
    name: "Car",
    Doc: "Top model Car",
    type: IntelligenceType.Class,
    child: [{
        name: "Name",
        Doc: "Car name",
        type: IntelligenceType.Property,
        returnType: "String"
    }, {
        name: "Details(model: number)",
        Doc: "Car details",
        type: IntelligenceType.Method,
        returnType: "Detail",
        child: [{
            name: "IsAvailable",
            type: IntelligenceType.Property,
            Doc: "is it available in showroom",
            returnType: "Boolean"
        }, {
            name: "Price",
            Doc: "Cost of car",
            type: IntelligenceType.Property,
            returnType: "number"
        }]
    }]
}];