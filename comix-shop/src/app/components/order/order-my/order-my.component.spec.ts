import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMyComponent } from './order-my.component';

describe('OrderMyComponent', () => {
  let component: OrderMyComponent;
  let fixture: ComponentFixture<OrderMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
