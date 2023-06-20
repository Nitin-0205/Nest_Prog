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

  @Post("new/:id")
  addProfile(@Param("id",ParseIntPipe)id:number,@Body() dto : ProfileDto){
      return this.profileService.addProfile(id ,dto)
  }
  @Patch("upd/:id")
  updateProfile(@Param("id",ParseIntPipe)id:number,@Body() dto: ProfileDto){
      return  this.profileService.updProfile(id ,dto)
  }
  @Delete("del/:id")
  deleteProfile(@Param("id")id:number){
      return this.profileService.delProfile(id)
  }
}
