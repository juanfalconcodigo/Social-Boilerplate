import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';


const schemaUser = new Schema<IUserDocument & IUserModel>({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    username: { required: true, type: String },
    email: { required: true, type: String },
    avatarImage: {
        type: String,
        default:
            "https://scontent.fsof4-1.fna.fbcdn.net/v/t1.30497-1/c71.0.240.240a/p240x240/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=CD3ImewvDlgAX8f-QvY&_nc_ht=scontent.fsof4-1.fna&oh=782172992e9272da49f35f7f40ef8d63&oe=5EED0201",
    },
    coverImage: {
        type: String,
    },
    gender: { required: true, type: String },
    birthday: { type: Date },
    password: { required: true, type: String },
    workPlace: { type: String },
    homePlace: { type: String },
    school: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

});


interface IUserDocument extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatarImage: string;
    coverImage?: string;
    gender: string;
    birthday?: Date;
    password: string;
    workPlace?: string;
    homePlace?: string;
    school?: string;
    friends?: IUserDocument[];
    add: () => any;
    comparePassword: (password: any) => any;
}

interface IUserModel extends Model<IUserDocument> {
    findByEmail: (email:string) => any;
}



//obs

schemaUser.statics.findByEmail = function (email: any, projection: any, opts: any) {
    return this.findOne({ email }, projection, opts);
};

schemaUser.methods.add = function () {
    return new Promise(resolve => {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) throw err;
            const username = `${this.firstName}.${
                this.lastName
                }${shortid.generate()}`;
            this.username = username.toLowerCase();
            this.password = hash;

            this.save((error: any, savedObj: any) => {
                if (error) throw error;
                resolve(savedObj);
            });
        });
    });
};

schemaUser.methods.comparePassword = function (password: any) {
    return bcrypt.compare(password, this.password);
};


const User: IUserModel = model<IUserDocument, IUserModel>('User', schemaUser);

export default User;