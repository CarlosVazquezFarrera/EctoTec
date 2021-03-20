import { BaseResponse } from "./BaseResponse";

export class Response<T> extends BaseResponse{
    data: T;
}