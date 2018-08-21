import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixDetailsComponent } from './comix-details.component';

describe('ComixDetailsComponent', () => {
  let component: ComixDetailsComponent;
  let fixture: ComponentFixture<ComixDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComixDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComixDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
