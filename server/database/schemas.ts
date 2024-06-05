import {Schema, Document} from 'mongoose';

import db from './db';

interface IPost extends Document {
    image_url: string;
    publish_date: Date;
    slug: string;
    title: string;
    description: string;
}

const PostSchema: Schema = new Schema({
    image_url: {type: String, required: true},
    publish_date: {type: Date, required: true},
    slug: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
});

const Post = db.model<IPost>('Post', PostSchema, 'posts');

export default Post;
