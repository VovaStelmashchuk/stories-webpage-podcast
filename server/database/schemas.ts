import { Document, Schema } from 'mongoose';

import db from './db';

interface IPost extends Document {
  _id: Schema.Types.ObjectId;
  publish_date: Date;
  slug: string;
  title: string;
  description: string;
  type: string;
  charters: [{ time: string, description: string }];
  duration: number;
  audio_file_key: string;
  links: [{ title: string, link: string }];
}

const PostSchema: Schema = new Schema({
    _id: Schema.Types.ObjectId,
    publish_date: { type: Date, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, required: true },
    charters: { type: [{ time: String, description: String }], required: false },
    duration: { type: Number, required: false },
    audio_file_key: { type: String, required: false },
    links: { type: [{ title: String, link: String }], required: false },
  }
);

const Post = db.model<IPost>('Post', PostSchema, 'posts');

export default Post;
