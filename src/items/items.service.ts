import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/entities/item.entity';
import { PageDto } from './dto/pagination.dto';
import { ItemFilterDto } from './dto/filter.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepo : Repository<Item> ){}

  async create(createItemDto: CreateItemDto) {
    const item = await this.itemRepo.save(createItemDto);
    return 'This action adds a new item';
  }

  async findAll() {
    const item = await this.itemRepo.find();
    return item
  }

  async findfilteredItem(ItemFltDto: ItemFilterDto) {
    console.log(ItemFltDto)
    const item = await this.findAll()
    const  filt = await item.filter((item) => 
    item.name.toLowerCase().includes(ItemFltDto?.name?.toLowerCase())&&
    item.description.toLowerCase().includes(ItemFltDto?.description?.toLowerCase())&&
    item.qty === parseInt(ItemFltDto?.qty)&&
    item.price === parseInt(ItemFltDto?.price)&&
    item.Catagories.toLowerCase().includes(ItemFltDto?.Catagories?.toLowerCase())
    )
    return filt;
  }


  async findpage(PageDto: PageDto) {
    if(PageDto.offset === undefined){
      PageDto.offset = "1"
    }
    if(PageDto.limit === undefined){
      PageDto.limit = "10"
    }
    const item = await this.itemRepo.createQueryBuilder("it").select().limit(parseInt(PageDto.limit)).offset(parseInt(PageDto.offset)-1).getMany();
    return item
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
