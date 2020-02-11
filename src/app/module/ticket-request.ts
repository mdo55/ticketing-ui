export class TicketRequest implements TRequest {
    ticketId: number;
    userId: string;
    ticket: string;
    type: string;
    description: string;
    attached: boolean;
    version: string;
    status: string;
    createdDate: Date;
    createdBy: string;
    updatedDate: Date;
    updatedBy: string;
    fileBase64: string;
    fileExtension: string;
    priority: string;
    active: boolean;
    fileName: string;
    constructor() {}
}
interface TRequest {
    ticketId: number;
    userId: string;
    ticket: string;
    type: string;
    description: string;
    attached: boolean;
    version: string;
    status: string;
    createdDate: Date;
    createdBy: string;
    updatedDate: Date;
    updatedBy: string;
    fileBase64: string;
    fileExtension: string;
    priority: string;
    active: boolean;
    fileName: string;
}

