import {Document, Schema} from 'mongoose';

import db from './db';

import translit from "translitit-cyrillic-ukrainian-to-latin";

export interface IPost extends Document {
  publish_date: Date;
  slug: string;
  title: string;
  type: string;
  visibility: string;
  charters: [{ time: string, description: string }];
  duration: number;
  audio_file_key: string;
  links: [{ title: string, link: string }];
}

const PostSchema: Schema = new Schema({
    publish_date: {type: Date, required: true},
    slug: {type: String, required: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    charters: {type: [{time: String, description: String}], required: false},
    duration: {type: Number, required: false},
    audio_file_key: {type: String, required: false},
    links: {type: [{title: String, link: String}], required: false},
    visibility: {type: String, required: true},
  }
);

export const Post = db.model<IPost>('Post', PostSchema, 'posts');

export async function createPodcast(name: string): Promise<IPost> {
  const post = new Post({
    publish_date: new Date(),
    slug: translit(name).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
    title: name,
    type: "draft",
    visibility: "private",
    links: [{
      title: "Підтримай нас на Patreon",
      link: "https://patreon.com/androidstory"
    }],
  });

  await post.save()

  return post
}

export async function getAllPodcasts(): Promise<IPost[]> {
  return Post.find().sort({publish_date: -1});
}

export async function getPodcastBySlug(slug: string): Promise<IPost | null> {
  return Post.findOne({slug});
}

export async function deletePodcastBySlug(slug: string) {
  await Post.deleteOne({slug});
}

export async function updatePodcastBySlug(slug: string, update: PodcastUpdate) {
  const podcast = await getPodcastBySlug(slug)

  if (podcast === null) {
    throw new Error("Podcast not found")
  }

  Object.assign(podcast, update);

  await podcast.save();

  return podcast;
}

export async function publishPodcastBySlug(slug: string) {
  const podcast = await getPodcastBySlug(slug)

  if (podcast === null) {
    throw new Error("Podcast not found")
  }

  podcast.type = "public";
  podcast.visibility = "public";

  await podcast.save();

  return podcast;
}

