import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TicketDto } from '../dto/TicketDto';

@Injectable()
export class DataSourceService {

    dSource: MatTableDataSource<TicketDto>;
    data: TicketDto[];
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    constructor() {
    }

    createDataSource(_data: TicketDto[]): void {
        this.data = _data;
        this.dSource = new MatTableDataSource(this.data);
        this.dSource.sort = this.sort;
        this.dSource.paginator = this.paginator;
    }

    dataSource(): MatTableDataSource<TicketDto> {
        return this.dSource;
    }

    updateData(obj: TicketDto) {
        this.data.push(obj);
        this.dSource.sort = this.sort;
        this.dSource.paginator = this.paginator;
    }

}
