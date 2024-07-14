import {Post} from "~/server/database/schemas";
import {buildObjectURL} from "~/server/minio/utils";
import {Podcast} from "podcast";
import {getFileSizeInByte, uploadFile} from "~/server/minio/minioClient";

const config = useRuntimeConfig()

export async function updateRss() {
  const podcasts = await Post
    .find({
      type: {$in: ["public"]},
      visibility: {$in: ["public"]}
    })
    .sort({publish_date: -1});

  const host = config.host;
  const logoUrl = buildObjectURL('logo.jpg')

  const description = 'Два андроїдщики, два Вови і деколи дві різні думки. Кожний подкаст ми обговорюємо нові релізи в світі android розробки, кращі і не дуже практики. Ділимося своїми думками, досвідом і деколи пробуємо не смішно жартувати. Також тут ви знайдете рекомендації початківцям, а хто давно в розробці мають тут просто гарно провести час. Якщо вам тут сподобалося то заходьте в наш telegram chat https://t.me/androidstory_chat Якщо прям сильно сподобалося закиньте там трішки грошей. https://www.patreon.com/androidstory'

  const author = 'Vova and Vova';

  const pubDate = new Date().toUTCString();

  const feed = new Podcast({
    title: 'Android story',
    description: description,
    feedUrl: buildObjectURL('rss.xml'),
    siteUrl: host,
    webMaster: host,
    generator: 'Android story',
    imageUrl: logoUrl,
    author: author,
    copyright: '© 2022 Android story',
    language: 'ua',
    categories: ['Technology'],
    pubDate: pubDate,
    ttl: 60,
    itunesAuthor: author,
    itunesType: 'episodic',
    itunesSummary: description,
    itunesOwner: {name: author, email: 'vovochkastelmashchuk@gmail.com'},
    itunesExplicit: false,
    itunesCategory: [{
      text: 'Technology',
    }, {
      text: 'News',
      subcats: [{
        text: 'Tech News',
      }],
    }],
    itunesImage: logoUrl,
  });

  const fileSizes = await Promise.all(podcasts.map(post =>
    getFileSizeInByte('episodes/' + post.audio_file_key)
  ));

  const podcastsUrl = await Promise.all(podcasts.map(post =>
    buildObjectURL('episodes/' + post.audio_file_key)
  ));

  const podcastCount = podcasts.length;

  podcasts.forEach((post, index) => {
    let description = 'В цьому випуску ';
    if (post.charters) {
      description += '<ul>'
      post.charters.forEach(chapter => {
        description += `<li>${chapter.time} - <em>${chapter.description}</em></li>`;
      });
      description += '</ul>'
    }

    if (post.links) {
      description += '<br>';
      description += '<h3>Згадано в випуску</h3>';
      description += '<ul>'
      post.links.forEach(link => {
        description += `<a href="${link.link}">${link.title}</a>`;
        description += '<br>';
      });
      description += '</ul>'
    }

    let linkToEpisode = `${config.host}/podcast/${post.slug}`;

    let guid = post.id.toString();

    let date = post.publish_date.toISOString();

    const duration: number = post.duration;

    feed.addItem({
      title: post.title,
      description: description,
      url: linkToEpisode,
      guid: guid,
      date: date,
      enclosure: {
        url: podcastsUrl[index],
        size: fileSizes[index],
      },
      itunesTitle: post.title,
      itunesDuration: duration,
      itunesExplicit: false,
      itunesEpisodeType: 'full',
      itunesSeason: 2,
      itunesEpisode: podcastCount - index,
      itunesImage: logoUrl,
      itunesAuthor: author,
      itunesSummary: description,
    });
  });

  await uploadFile('rss.xml', feed.buildXml());
}