export class MemberDto {
    codeArea!: string;
    fullName!: string;
    email!: string;
    mobileNumber!: string;

    setAreaCode(codeArea: string): this {
        this.codeArea = codeArea;
        return this;
    }

    setFullname(fullName: string): this {
        this.fullName = fullName;
        return this;
    }

    setEmail(email: string): this {
        this.email = email;
        return this;
    }

    setMobileNumber(mobileNumber: string): this {
        this.mobileNumber = mobileNumber;
        return this;
    }
}
