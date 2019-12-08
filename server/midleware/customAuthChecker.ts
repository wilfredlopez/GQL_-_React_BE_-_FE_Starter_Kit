import { AuthChecker } from "type-graphql";
import { MyContext } from "../interfaces/myContext";
import { ObjectID } from "bson";

export const customAuthChecker: AuthChecker<MyContext> = async (
  { root, args, context, info },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  if (!context.req || !context.req.userId) {
    return false;
  }

  if (roles.includes("admin")) {
    try {
      const id = new ObjectID(context.req.userId);
      const user = await context.userLoader.load(id as any);
      if (!user) {
        return false;
      }
      if (user.admin) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  }
  if (context.req && context.req.userId) {
    return true;
  }

  return false; // or false if access is denied
};
