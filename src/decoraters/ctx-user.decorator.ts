import { createParamDecorator ,  ExecutionContext  } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CtxClient = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    let ctx
    try {
      ctx = GqlExecutionContext.create(context);      
    } catch(err) {
      console.log(err);         
    }
    return ctx.getContext().req.user;
  },
);

