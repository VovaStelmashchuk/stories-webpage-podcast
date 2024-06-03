import {Schema, Document} from 'mongoose';

import db from './db';

interface IPost extends Document {
    image_url: string;
    parts: Array<{ time: string; name: string }>;
    publish_date: Date;
    slug: string;
    title: string;
}

const PostSchema: Schema = new Schema({
    image_url: {type: String, required: true},
    parts: [{time: String, name: String}],
    publish_date: {type: Date, required: true},
    slug: {type: String, required: true},
    title: {type: String, required: true},
});

const Post = db.model<IPost>('Post', PostSchema);

export default Post;
