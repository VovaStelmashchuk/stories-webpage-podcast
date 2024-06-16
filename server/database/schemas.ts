import {Schema, Document} from 'mongoose';

import db from './db';

interface IPost extends Document {
    _id: Schema.Types.ObjectId;
    image_url: string;
    publish_date: Date;
    slug: string;
    title: string;
    description: string;
    type: string;
    charters: [{ time: string, description: string }];
    audioUrl: string;
    duration: number;
    number: string;
}

const PostSchema: Schema = new Schema({
        _id: Schema.Types.ObjectId,
        image_url: {type: String, required: true},
        publish_date: {type: Date, required: true},
        slug: {type: String, required: true},
        title: {type: String, required: true},
        description: {type: String, required: false},
        type: {type: String, required: true},
        charters: {type: [{time: String, description: String}], required: false},
        audioUrl: {type: String, required: false},
        duration: {type: Number, required: false},
        number: {type: String, required: false},
    }
);

const Post = db.model<IPost>('Post', PostSchema, 'posts');

export default Post;