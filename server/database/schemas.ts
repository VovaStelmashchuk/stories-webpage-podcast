import { Document, Schema } from 'mongoose';

import db from './db';

import translit from "translitit-cyrillic-ukrainian-to-latin";

export interface IPost extends Document {
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

export const Post = db.model<IPost>('Post', PostSchema, 'posts');

export async function createPodcast(name: string): Promise<IPost> {
  const post = new Post({
    publish_date: new Date(),
    slug: translit(name),
    title: name,
    type: "draft",
  });

  await post.save()

  return post
}

export async function getAllPodcasts(): Promise<IPost[]> {
  return Post.find().sort({ publish_date: -1 });
}
