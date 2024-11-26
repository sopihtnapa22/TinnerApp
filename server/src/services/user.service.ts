import mongoose, { RootFilterQuery } from "mongoose"
import { userPaginator } from "../types/user.type"
import { IUserDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helpers/query.helper"

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
    },
    getByUserName: function (user: string): Promise<user> {
        throw new Error('not implement')
    },
    updateProfile: function () {
        throw new Error('not implement')
    }


}