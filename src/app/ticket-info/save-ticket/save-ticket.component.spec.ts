import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveTicketComponent } from './save-ticket.component';

describe('SaveTicketComponent', () => {
  let component: SaveTicketComponent;
  let fixture: ComponentFixture<SaveTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
