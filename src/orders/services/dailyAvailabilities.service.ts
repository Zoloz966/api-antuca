import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { CreateDailyAvailabilityDto } from './../dto/create-dailyAvailability.dto';
import { UpdateDailyAvailabilityDto } from './../dto/update-dailyAvailability.dto';

import { DailyAvailability } from './../entities/dailyAvailability.entity';
import { start } from 'repl';
import { UserContextService } from 'src/userContext/service/userContext.service';

@Injectable()
export class DailyAvailabilitysService {
  constructor(
    @InjectRepository(DailyAvailability)
    private dailyAvailabilityRepository: Repository<DailyAvailability>,

    private userContextService: UserContextService,
  ) {}

  async create(createDailyAvailabilityDto: CreateDailyAvailabilityDto) {
    const dailyAvailability = await this.dailyAvailabilityRepository.findOne({
      where: {
        date: createDailyAvailabilityDto.date,
        itemIdItem: createDailyAvailabilityDto.itemIdItem,
      },
    });

    if (dailyAvailability) {
      throw new ConflictException(
        'Ya existe una disponibilidad para esta fecha.',
      );
    }

    const newDailyAvailability = this.dailyAvailabilityRepository.create(
      createDailyAvailabilityDto,
    );

    return await this.dailyAvailabilityRepository.save(newDailyAvailability);
  }

  async findAll() {
    const list = await this.dailyAvailabilityRepository.find({
      where: { status: 1 },
      relations: ['item'],
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'Empty list' });
    }

    return list;
  }

  async findAllByDates(datestart: any, dateend: any) {
    datestart = datestart + 'T00:00:00.000Z';
    dateend = dateend + 'T23:59:59.999Z';

    const list = await this.dailyAvailabilityRepository.find({
      relations: { item: true },
      where: {
        date: Between(datestart, dateend),
        status: 1,
      },
      order: {
        date: 'DESC',
      },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'Empty list' });
    }
    return list;
  }

  async findOne(id: number) {
    const dailyAvailability = await this.dailyAvailabilityRepository.findOne({
      where: { id_daily_availability: id, status: 1 },
      relations: ['item'],
    });
    if (!dailyAvailability) {
      throw new NotFoundException(`This dailyAvailability #${id} not found`);
    }
    return dailyAvailability;
  }

  async update(
    id: number,
    updateDailyAvailabilityDto: UpdateDailyAvailabilityDto,
  ) {
    const dailyAvailability = await this.dailyAvailabilityRepository.findOneBy({
      id_daily_availability: id,
    });

    this.dailyAvailabilityRepository.merge(
      dailyAvailability,
      updateDailyAvailabilityDto,
    );

    return this.dailyAvailabilityRepository.save(dailyAvailability);
  }

  async remove(id: number) {
    const dailyAvailability = await this.dailyAvailabilityRepository.findOneBy({
      id_daily_availability: id,
    });
    const deleteDailyAvailability: UpdateDailyAvailabilityDto = {
      status: 0,
    };

    this.dailyAvailabilityRepository.merge(
      dailyAvailability,
      deleteDailyAvailability,
    );
    return this.dailyAvailabilityRepository.save(dailyAvailability);
  }
}
