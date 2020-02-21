import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTicketDialogComponent } from './save-ticket-dialog.component';

describe('SaveTicketDialogComponent', () => {
  let component: SaveTicketDialogComponent;
  let fixture: ComponentFixture<SaveTicketDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTicketDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
