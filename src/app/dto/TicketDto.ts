export interface TicketDto {
    
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
    fileBase64: string | ArrayBuffer;
    fileExtension: string;
    priority: string;
    active: boolean;
    fileName: string;
}