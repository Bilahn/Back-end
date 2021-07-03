import { Controller, Get, UseGuards, HttpStatus, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req ) {
  // }

  @Get()
  sayHello(){
    return 'Hello World!'
  }

  // @Get('/auth/google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.appService.googleLogin(req)
  // }


  // @Get("/facebook")
  // @UseGuards(AuthGuard("facebook"))
  // async facebookLogin(): Promise<any> {
    
  //   return HttpStatus.OK;
  // }

  // @Get("/facebook/redirect")
  // @UseGuards(AuthGuard("facebook"))
  // async facebookLoginRedirect(@Req() req: Request): Promise<any> {
  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: req.user,
  //   };
  // }
}