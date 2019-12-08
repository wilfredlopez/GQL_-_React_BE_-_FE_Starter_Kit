import bcrypt from "bcryptjs";
import { ObjectID } from "bson";
import Gravatar from "gravatar";
import { verify } from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import {
  User,
  UserInputType,
  UserLoginInput,
  UpdateUserInputType
} from "../../entity/User";
import { JWT_SECRET } from "../../env";
import { MyContext } from "../../interfaces/myContext";
import { createToken } from "../../utils/createToken";
import { SendCookies } from "../../utils/sendCookies";

@Resolver(User)
export class UserResolver {
  //Cannot pass the entity or typescript type to the @mutation
  //need to create an object type. @ObjectType for this
  @Mutation(returns => User)
  async register(
    @Arg("userData")
    { email, password, lastname, firstname }: UserInputType
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const gravatar = Gravatar.url(email.toLowerCase());
      //   await this.recipeService.removeById(id);
      const user = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstname,
        lastName: lastname,
        count: 0,
        confirmed: false,
        avatar: gravatar,
        admin: false,
        themeMode: "light"
      });
      //i removed the .save from the line above

      const { accessToken, refreshToken } = createToken(user);

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await user.save();

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Authorized("view")
  @Mutation(returns => Boolean!)
  async updateUser(
    @Ctx() ctx: MyContext,
    @Arg("userInput", {
      description: "User Existing or new data to update"
    })
    { email, lastName, firstName }: UpdateUserInputType
  ): Promise<boolean> {
    try {
      const { userId } = ctx.req;

      const id = new ObjectID(userId);
      const user = await ctx.userLoader.load(id as any);

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      await user.save();
      //   await this.recipeService.removeById(id);

      return true;
    } catch (e) {
      console.log(e);
      return false;
      // throw new Error(e);
      // return false
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("loginData")
    { email, password }: UserLoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: {
          email: email.toLowerCase()
        }
      });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid Password"); //if password is not valid
        }

        //TODO: I NEED TO FIX THIS WHEN I ADD EMAIL CONFIRMATION
        // if (!user.confirmed) {
        //   throw new Error("Not Confirmed. Please confirm your email address") //if password is not valid
        // }

        const { accessToken, refreshToken } = createToken(user);

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;

        SendCookies(ctx.res, accessToken, refreshToken);

        // const hour = 3600000
        // ctx.res.cookie("refresh-token", refreshToken, {
        //   expires: true,
        //   maxAge: 14 * 24 * hour, //2 weeks
        //   httpOnly: true,
        //   domain: '.herokuapp.com'
        // })

        // ctx.res.cookie("access-token", accessToken, {
        //   expires: true,
        //   maxAge: 24 * hour, //24 hours
        //   httpOnly: true,
        // })

        return user.save(); //if password is valid
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    // const request = ctx.req as any
    try {
      let { userId } = ctx.req;
      if (!userId) {
        return null;
      }

      // //@ts-ignore
      // if (!request.userId) {
      //   return undefined
      // }

      //do it with user id

      const id = new ObjectID(userId);
      const user = await ctx.userLoader.load(id as any);
      // const user = await User.findOneOrFail(userId)

      //do it with email
      // const user = await User.findOne({
      //   where: {
      //     email: request.email,
      //   },
      // })
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error, "@UserResolver.ts Line 131");
      return null;
    }
  }

  @Mutation(() => Boolean!)
  async changeTheme(
    @Ctx() ctx: MyContext,
    @Arg("themeMode") themeMode: string
  ): Promise<boolean> {
    // const request = ctx.req as any
    try {
      let { userId } = ctx.req;
      if (!userId) {
        return false;
      }
      const id = new ObjectID(userId);
      const user = await ctx.userLoader.load(id as any);

      if (user) {
        user.themeMode = themeMode;
        await user.save();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error, "@UserResolver.ts Line 201");
      return false;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    ctx.res.clearCookie(ACCESS_TOKEN);
    ctx.res.clearCookie(REFRESH_TOKEN);

    //JWT AUTH
    ctx.req.userId = undefined;
    ctx.req.email = undefined;
    //RND JWT AUTH
    // if (ctx.req.session) {
    //   return new Promise((resolve, reject) =>
    //     ctx.req.session!.destroy(err => {
    //       if (err) {
    //         console.log(err);
    //         return reject(false);
    //       }
    //       return resolve(true);
    //     })
    //   );
    // } else {
    //   return true;
    // }
    return true;
  }

  @Authorized("admin")
  @Mutation(() => Boolean)
  async makeUserAdmin(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return false;
      }

      user.admin = true;
      await user.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<Boolean> {
    const verified = (await verify(token, JWT_SECRET!)) as any;

    if (!verified.userId) {
      return false;
    }
    const user = await User.findOneOrFail({ id: verified.userId });
    if (!user) {
      return false;
    }

    user.confirmed = true;
    await user.save();

    return true;
  }

  @Authorized() //only authorized members can access
  @Query(() => Boolean, { nullable: true })
  async AmIAuthorized(@Ctx() ctx: MyContext): Promise<boolean> {
    try {
      const { userId } = ctx.req;

      if (!userId) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  //just for dev
  @Query(returns => [User])
  async getAllUsers(@Ctx() {}: MyContext) {
    if (process.env.NODE_ENV === "production") {
      return new Error("UnAuthorized in Production");
    }
    const users = await User.find();
    return users;
  }
}

export default UserResolver;
