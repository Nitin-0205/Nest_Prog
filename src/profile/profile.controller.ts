import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/Profile.dto';
import { jwtGuard } from 'src/User/jwt/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(jwtGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

 
  @Get()
  getProfile(){
      return this.profileService.getProfile()
  }
  @Get("userProfile/:emailid")
  getUserProfile(@Param("emailid")emailid:string){
      return this.profileService.getUserProfile(emailid)
  }

  @Post("new")
  addProfile(@Body() dto : ProfileDto){
      return this.profileService.addProfile(dto)
  }
  @Patch("upd")
  updateProfile(@Body() dto: ProfileDto){
      return  this.profileService.updProfile(dto)
  }
  @Delete("del/:emailid")
  deleteProfile(@Param("emailid")emailid:string){
      return this.profileService.delProfile(emailid)
  }
}
