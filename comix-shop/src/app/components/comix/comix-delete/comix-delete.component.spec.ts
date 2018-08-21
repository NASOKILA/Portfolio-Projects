import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixDeleteComponent } from './comix-delete.component';

describe('ComixDeleteComponent', () => {
  let component: ComixDeleteComponent;
  let fixture: ComponentFixture<ComixDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComixDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComixDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
