import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from 'src/backend/tasks/task.service';
import { of } from 'rxjs';
import { Tasks } from 'src/backend/tasks/task.interface';
import {TaskListComponent} from "./task-list.component";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Tasks[] = [
    {
      id: 1,
      name: 'Test Task',
      description: '',
      taskDate: new Date().toISOString(),
      taskTime: new Date().toISOString(),
      status: 'pending',
      user: '1'
    }
  ];

  const mockTaskService = {
    getTasksByUserForToday: jasmine.createSpy().and.returnValue(of(mockTasks)),
    addTask: jasmine.createSpy().and.returnValue(of({ id: 2 })),
    updateTask: jasmine.createSpy().and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les tâches à l\'initialisation', () => {
    expect(mockTaskService.getTasksByUserForToday).toHaveBeenCalled();
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('devrait mettre une tâche en mode édition', () => {
    const task = { ...mockTasks[0], isEditing: false };
    component.toggleEditTask(task);
    expect(task.isEditing).toBeTrue();
  });

  it('devrait annuler l\'édition et recharger les tâches', () => {
    const task = { ...mockTasks[0], isEditing: true };
    component.cancelEditTask(task);
    expect(task.isEditing).toBeFalse();
    expect(mockTaskService.getTasksByUserForToday).toHaveBeenCalledTimes(2); // une fois au init, une fois ici
  });

  it('devrait calculer la position verticale en pixels', () => {
    const top = component.calculateTop('2025-07-08T10:30:00');
    expect(top).toBe('250px'); // 10h30 = 2.5h après 8h => 2.5 * 100 = 250
  });

  it('devrait enregistrer une nouvelle tâche et l\'ajouter à la liste', () => {
    component.currentUser = { id: 1, name: 'Test' } as any;
    component.saveTaskCard('Nouvelle tâche', new Date().toISOString());

    expect(mockTaskService.addTask).toHaveBeenCalled();
    expect(component.isAddingTask).toBeFalse();
  });
});
