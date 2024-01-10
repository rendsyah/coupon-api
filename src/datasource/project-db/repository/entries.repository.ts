// Import Modules
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import Base Repository
import { BaseRepository } from './base.repository';

// Import Entity
import { Entries } from '../models/entries.entity';

@Injectable()
export class EntriesRepository extends BaseRepository<Entries> {
    constructor(@InjectRepository(Entries) private readonly entriesModels: Repository<Entries>) {
        super(entriesModels);
    }
}
