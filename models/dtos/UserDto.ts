export class UserDto {
    userTypeId!: string;
    fullName!: string;
    username!: string;
    photoProfile!: string;

    setUserTypeId(userTypeId: string): this {
        this.userTypeId = userTypeId;
        return this;
    }

    setFullName(fullName: string): this {
        this.fullName = fullName;
        return this;
    }

    setUsername(username: string): this {
        this.username = username;
        return this;
    }

    setPhotoProfile(photoProfile: string): this {
        this.photoProfile = photoProfile;
        return this;
    }
}
