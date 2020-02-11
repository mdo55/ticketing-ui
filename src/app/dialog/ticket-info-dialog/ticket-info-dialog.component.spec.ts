import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInfoDialogComponent } from './ticket-info-dialog.component';

describe('TicketInfoDialogComponent', () => {
  let component: TicketInfoDialogComponent;
  let fixture: ComponentFixture<TicketInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
