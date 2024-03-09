import { UserEntity } from "../entities/user.entity";

export class PaginatedUsersDto implements PaginationResult<UserEntity> {
    meta: {
        count: number;
    };
    data: UserEntity[];
}