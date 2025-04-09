import type { Undefined } from '~/types';

export class UserSearchParam {
    title!: Undefined<string>;

    setTitle(value: Undefined<string>): this {
        this.title = value;
        return this;
    }
}
