import {updateRss} from "~/server/rss/generator";

export default defineEventHandler(async () => {
  await updateRss();

  return {
    result: 'ok',
  };
});
