import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [UserDashboardComponent],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        },
        UserService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTriviaContestsForUser', () => {
    expect(component.getTriviaContestsForUser()).toBeCalledTimes;
  });
});
