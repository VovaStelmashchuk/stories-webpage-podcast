import Post from "~/server/database/schemas";
import S3 from "~/server/s3/s3";
import {Podcast} from "podcast";

export default defineEventHandler(async (event) => {
    if (event.method !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    const posts = await Post
        .find({type: {$in: ["public"]}})
        .sort({publish_date: -1});

// create rss feed
    const feed = new Podcast({
        title: 'Android story',
        description: 'Два андроїдщики, два Вови і деколи дві різні думки. Кожний подкаст ми обговорюємо нові релізи в світі android розробки, кращі і не дуже практики. Ділимося своїми думками, досвідом і деколи пробуємо не смішно жатрувати. Також тут ви знайдете рекомендації початківцям, а хто давно в розробці мають тут просто гарно провести час. Якщо вам тут сподобалося то заходьте в наш telegram chat https://t.me/androidstory_chat Якщо прям сильно сподобалося закиньте там трішки грошей. https://www.patreon.com/androidstory</p>',
        feedUrl: 'https://story-podcast.ams3.cdn.digitaloceanspaces.com/rss.xml',
        siteUrl: 'https://androidstory.dev',
        imageUrl: 'https://assets.pippa.io/shows/62efce09bcb3d10013e2cc9b/show-cover.jpg',
        author: 'Vova and Vova',
        copyright: '© 2022 Android story',
        language: 'ua',
        categories: ['Technology'],
        pubDate: 'May 20, 2012 04:00:00 GMT',
        ttl: 60,
        itunesAuthor: 'Vova and Vova',
        itunesType: 'episodic',
        itunesSummary: 'Два андроїдщики, два Вови і деколи дві різні думки. Кожний подкаст ми обговорюємо нові релізи в світі android розробки, кращі і не дуже практики. Ділимося своїми думками, досвідом і деколи пробуємо не смішно жатрувати. Також тут ви знайдете рекомендації початківцям, а хто давно в розробці мають тут просто гарно провести час. Якщо вам тут сподобалося то заходьте в наш telegram chat https://t.me/androidstory_chat Якщо прям сильно сподобалося закиньте там трішки грошей. https://www.patreon.com/androidstory',
        itunesOwner: {name: 'Vova and Vova', email: 'vovochkastelmashchuk@gmail.com'},
        itunesExplicit: false,
        itunesCategory: [{
            text: 'Technology',
        }, {
            text: 'News',
            subcats: [{
                text: 'Tech News',
            }],
        }],
        itunesImage: 'https://assets.pippa.io/shows/62efce09bcb3d10013e2cc9b/show-cover.jpg',
    });

    const fileSizes = await Promise.all(posts.map(post =>
        S3.getFileSizeInByte('episodes/' + post.number + '.mp3')
    ));

    posts.forEach((post, index) => {
        let description = '';
        if (post.charters) {
            description = '<ul>';
            post.charters.forEach(chapter => {
                description += `<li>${chapter.time} - ${chapter.description}</li>`;
            });
            description += '</ul>';
        }

        let linkToEpisode = `https://androidstory.dev/podcast/${post.slug}`;

// get mongo id as tring
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
                url: post.audioUrl,
                size: fileSizes[index],
            },
            itunesTitle: post.title,
            itunesDuration: duration,
            itunesExplicit: false,
            itunesEpisodeType: 'full',
            itunesSeason: 2,
            itunesEpisode: 111111111,
            itunesImage: 'https://assets.pippa.io/shows/62efce09bcb3d10013e2cc9b/show-cover.jpg',
            itunesAuthor: 'Vova and Vova',
            itunesSummary: post.description,
        });
    });

    const result = await S3.uploadFile('rss.xml', feed.buildXml());

    console.log(result);

    return {
        test: 'test',
    };
});
