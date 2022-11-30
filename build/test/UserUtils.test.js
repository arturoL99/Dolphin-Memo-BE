"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserUtils_1 = require("../util/UserUtils/UserUtils");
describe("User utils tests:", () => {
    /*
    test("should create a new User", () => {
      const users: Gamer[] = AllUsersTest.newUser(
        "test",
        "test",
        true,
        "test",
        2
      );
      expect(users.length).toEqual(1);
    });
  
    test("should get users", () => {
      const users: Gamer[] = AllUsersTest.getUsers();
      expect(users.at(0)?.getName()).toEqual("test");
    });
  
    test("should get User by id", () => {
      const users: Gamer[] = AllUsersTest.getUsers();
      const user: Gamer | undefined = AllUsersTest.getUser("test");
      expect(user?.getName()).toEqual("test");
    });
  
    test("should get Users in room", () => {
      const users: Gamer[] = AllUsersTest.getUsers();
      const usersInRoom: Gamer[] = AllUsersTest.getUsersInRoom("test");
      expect(usersInRoom.length).toEqual(1);
    }); */
    test("should remove User", () => {
        const users = UserUtils_1.AllUsersTest.getUsers();
        UserUtils_1.AllUsersTest.removeUser("test");
        expect(users.length).toEqual(0);
    });
    test("should set User", () => {
        const users = [];
        UserUtils_1.AllUsersTest.setUsers(users);
        expect(users.length).toEqual(0);
    });
});
