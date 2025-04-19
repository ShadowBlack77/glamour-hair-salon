import { SetMetadata } from "@nestjs/common";

export const PUBLIC_TOKEN: string = 'PUBLIC';

export const Public = () => SetMetadata(PUBLIC_TOKEN, true);