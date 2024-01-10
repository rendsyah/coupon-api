// Import All Repository
import { AccessRepository, EntriesRepository, UsersRepository } from '@datasource/project-db/repository';

// Define Project DB Models Interfaces
export interface IProjectDbModels {
    AccessModels: AccessRepository;
    EntriesModels: EntriesRepository;
    UsersModels: UsersRepository;
}
