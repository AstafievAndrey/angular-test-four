import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueLineComponent } from './blue-line.component';

describe('BlueLineComponent', () => {
  let component: BlueLineComponent;
  let fixture: ComponentFixture<BlueLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
