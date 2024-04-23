// describe("demo", function () {
//   it("Este test debe pasar siempre", function () {
//     expect(4 + 2).toBe(6);
//   });
// });


//Para que los test funcionen se debe comentar desde la linea 30 a la 121 del archivo index.js.

const { Activity, Repository } = require('../scripts/index')

describe('Test clase activity', () => {
  it('La clase Activity debe existir', () => {
    expect(Activity).toBeDefined()
  });

  it('Crear una actividad con las propiedades correctas', () => {
    const activity = new Activity('Actividad1', 'Esta es una nueva actividad', 'actividad-1.jpg');
    expect(activity.id).toBeGreaterThan(0);
    expect(activity.title).toBe('Actividad1');
    expect(activity.description).toBe('Esta es una nueva actividad');
    expect(activity.imgUrl).toBe('actividad-1.jpg');
  });

})

describe('Test clase Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository();
  });
  it('La clase Repository debe existir', () => {
    expect(Repository).toBeDefined()
  });

  it('Crear una actividad dentro de la clase Repository', () => {
    const activity = { title: 'Actividad1', description: 'Esta es una nueva actividad', imgUrl: 'actividad-1.jpg' };
    const activity2 = { title: 'Actividad2', description: 'Esta es otra actividad', imgUrl: 'actividad-2.jpg' };
    repository.createActivity(activity);
    repository.createActivity(activity2);
    const activities = repository.getAllActivities();
    expect(activities.length).toBe(2);
    expect(activities[0].title).toBe('Actividad1');
    expect(activities[1].description).toBe('Esta es otra actividad');
  });

  it('Eliminar actividad de la clase Repository por id', () => {
    const activity = { title: 'Actividad1', description: 'Esta es una nueva actividad', imgUrl: 'actividad-1.jpg' };
    const activity2 = { title: 'Actividad2', description: 'Esta es otra actividad', imgUrl: 'actividad-2.jpg' };
    repository.createActivity(activity);
    repository.createActivity(activity2);
    const activityId = repository.getAllActivities()[0].id;
    repository.deleteActivity(activityId);
    const activities = repository.getAllActivities();
    expect(activities.length).toBe(1);
  });

})

