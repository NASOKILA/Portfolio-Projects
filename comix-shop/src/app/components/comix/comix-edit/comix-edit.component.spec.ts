import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComixEditComponent } from './comix-edit.component';

describe('ComixEditComponent', () => {
  let component: ComixEditComponent;
  let fixture: ComponentFixture<ComixEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComixEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComixEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
