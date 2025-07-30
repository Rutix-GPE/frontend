import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service';
import { AuthService } from 'src/backend/user/auth.service';
import { CategorieService } from 'src/backend/categorie/categorie.service';
import { TaskService } from 'src/backend/tasks/task.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { of } from 'rxjs';
import {HomePage} from "./home.component";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // === Mocks des services ===
  const mockQuestionService = {
    listAll: jasmine.createSpy().and.returnValue(of([])),
  };

  const mockResponseService = {
    getUserResponsesByUserId: jasmine.createSpy().and.returnValue(of([])),
  };

  const mockAuthService = {
    currentUser$: of({ id: 1, name: 'Test User' }),
  };

  const mockCategorieService = {
    listAll: jasmine.createSpy().and.returnValue(of([])),
  };

  const mockTaskService = {
    getTasksByUserForToday: jasmine.createSpy().and.returnValue(of([])),
    addTask: jasmine.createSpy().and.returnValue(of({ id: 1 })),
    updateTask: jasmine.createSpy().and.returnValue(of({})),
  };

  const mockRouter = {
    navigate: jasmine.createSpy()
  };

  const mockMenu = {
    open: jasmine.createSpy(),
    close: jasmine.createSpy()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: QuestionService, useValue: mockQuestionService },
        { provide: ResponseService, useValue: mockResponseService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: CategorieService, useValue: mockCategorieService },
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter },
        { provide: MenuController, useValue: mockMenu },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les questions', () => {
    expect(mockQuestionService.listAll).toHaveBeenCalled();
  });

  it('devrait charger les réponses utilisateur si connecté', () => {
    expect(mockResponseService.getUserResponsesByUserId).toHaveBeenCalledWith(1);
  });

  it('devrait charger les tâches', () => {
    expect(mockTaskService.getTasksByUserForToday).toHaveBeenCalled();
  });

  it('devrait sauvegarder le mémo localement', () => {
    spyOn(localStorage, 'setItem');
    component.postItMemo = 'Nouveau mémo';
    component.saveMemo();
    expect(localStorage.setItem).toHaveBeenCalledWith('postItMemo', 'Nouveau mémo');
  });

  it('devrait naviguer vers la routine', () => {
    component.goToRoutine();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/routine']);
    expect(mockMenu.close).toHaveBeenCalled();
  });
});
