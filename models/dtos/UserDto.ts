import type { UserType } from '~/types';

export class UserDto {
    username!: string;
    fullName!: string;
    userType!: UserType;
    areas!: string[];

    setFullName(fullName: string): this {
        this.fullName = fullName;
        return this;
    }

    setUsername(username: string): this {
        this.username = username;
        return this;
    }

    setUserType(userType: UserType): this {
        this.userType = userType;
        return this;
    }

    setAreas(areas: string[]): this {
        this.areas = areas;
        return this;
    }
}
