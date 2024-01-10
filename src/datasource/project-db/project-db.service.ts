// Import Modules
import { Injectable } from '@nestjs/common';

// Import Repository
import { AccessRepository, EntriesRepository } from './repository';
import { UsersRepository } from './repository/users.repository';

// Import Interfaces
import { IProjectDbModels } from '@datasource/interfaces/project-db.interface';

@Injectable()
export class ProjectDbService {
    constructor(
        private readonly accessRepository: AccessRepository,
        private readonly entriesRepository: EntriesRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    getModels(): IProjectDbModels {
        return {
            AccessModels: this.accessRepository,
            EntriesModels: this.entriesRepository,
            UsersModels: this.usersRepository,
        };
    }
}
