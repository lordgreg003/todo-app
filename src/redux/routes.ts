const BASE = "https://chalynyx-todo-backend.onrender.com/api";

export const API_ROUTES = {
  //User
  Todo: {
    create: BASE + "/todo/create", // POST
    update: BASE + "/update/todo/", // PUT :id
    delete: BASE + "/delete/todo/", // DELETE :id
    getByID: BASE + "/getbyid/todo/", // GET :id
    getAll: BASE + "/getall/todo/", // GET
    // getUserOrders: BASE + "/admin/order/user/", // GET :id - user's Id
  },
};
