//open for changes
interface itemAttributes {
    [key: string]: any;
}

interface operationsAttributes {
    [key: string]: any;
}

export enum Role {
    "PLAYER",
    "ADMIN",
    "MANAGER",
}

export interface newUserDetails {
    email: string;
    role: string;
    username: string;
    avatar: string;
}

interface userId {
    space: string;
    email: string;
}

export interface userBoundery {
    userId: userId;
    role: Role;
    username: string;
    avatar: string;
}

interface itemId {
    space: string;
    id: string;
}

export interface ItemBoundary {
    itemId?: itemId;
    type: string;
    name: string;
    active: boolean;
    createdTimestamp?: Date;
    createdBy?: {
        userId: userId;
    };
    location?: {
        lat: Number;
        lng: Number;
    };
    itemAttributes: itemAttributes;
}

interface operationsId {
    space: string;
    id: string;
}

export interface OperationBoundary {
    operationId: operationsId;
    type: string;
    item: {
        itemId: itemId;
    };
    createdTimestamp?: Date;
    invokedBy: {
        userId: userId;
    };
    operationAttributes: operationsAttributes;
}
