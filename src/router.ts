import controller from './controller';

export default new Map([
  ['GET /api/users', controller.getUsers],
  ['POST /api/users', controller.addUser],
  ['GET /api/users/:id', controller.getUser],
  ['PUT /api/users/:id', controller.updateUser],
  ['DELETE /api/users/:id', controller.deleteUser],
]);
