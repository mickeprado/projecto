import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMainComponent } from './signup.main.component';

describe('SignupMainComponent', () => {
  let component: SignupMainComponent;
  let fixture: ComponentFixture<SignupMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
