import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutineListPage } from './routine-list.component';

describe('RoutineListPage', () => {
  let component: RoutineListPage;
  let fixture: ComponentFixture<RoutineListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
