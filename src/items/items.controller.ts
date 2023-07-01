import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PageDto } from './dto/pagination.dto';
import { ItemFilterDto } from './dto/filter.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  ///////////////////// Filtering the items/////////////////////////


  @Get('filter')
  findfilteredItem(@Query()dto :ItemFilterDto) {
    return this.itemsService.findfilteredItem(dto);
    
  }

  @Get('page')
  findOne(@Query() page: PageDto) {
    return this.itemsService.findpage(page);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemsService.update(+id, updateItemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.itemsService.remove(+id);
  // }
}
