import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversednsComponent } from './reversedns.component';

describe('ReversednsComponent', () => {
  let component: ReversednsComponent;
  let fixture: ComponentFixture<ReversednsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversednsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversednsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
