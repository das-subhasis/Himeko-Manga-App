const axios = require('axios');

const base_url = "https://api.mangadex.org";
const cover_url = "https://uploads.mangadex.org/covers";

const searchManga = async (params) => {
    try {
        const resp = await axios.get(`${base_url}/manga?includes[]=cover_art&includes[]=artist&includes[]=author`,
            { params: { ...params } });

        const data = resp.data.data.map(item => {
            const mangaTitle = item.attributes.title?.en || item.attributes.title["ja-ro"];
            const latestUploadedChapter = item.attributes.latestUploadedChapter;
            const tags = item.attributes.tags;
            const year = item.attributes.year;
            const status = item.attributes.status;
            const description = item.attributes.description.en;

            const authorId = item.relationships.find(rel => rel.type === 'author')?.id;
            const authorAttributes = item.relationships.find(rel => rel.type === 'author')?.attributes;
            const authorName = authorAttributes?.name;

            const artistId = item.relationships.find(rel => rel.type === 'artist')?.id;
            const artistAttributes = item.relationships.find(rel => rel.type === 'artist')?.attributes;
            const artistName = artistAttributes?.name;

            const coverArtId = item.relationships.find(rel => rel.type === 'cover_art')?.id;
            const coverArtAttributes = item.relationships.find(rel => rel.type === 'cover_art')?.attributes;
            const coverArtUrl = coverArtAttributes.fileName;
            return {
                mangaId: item.id,
                title: mangaTitle,
                latestUploadedChapter,
                tags,
                year,
                status,
                description: description,
                authorId,
                author: authorName,
                artistId,
                artist: artistName,
                coverArtId,
                coverArtUrl
            };
        });
        console.log(data);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch manga data');
    }
};

const getMangaByTagID = async (include = [], exclude = []) => {
    try {
        const tags = await axios.get(`${base_url}/manga/tag`);

        const includedTags = tags.data.data
            .filter(tag => include.includes(tag.attributes.name.en))
            .map(tags => tags.id);
        const excludedTags = tags.data.data
            .filter(tag => exclude.includes(tag.attributes.name.en))
            .map(tags => tags.id);
        return searchManga({ includedTags, excludedTags });
    } catch (error) {
        throw new Error('Failed to fetch manga by tags');
    }
};

const getMangaByRating = async (rating, followedCount) => {
    try {
        const order = {
            rating: rating || 'desc',
            followedCount: followedCount || 'desc'
        };
        const finalOrderedQuery = {};
        for (const [key, value] of Object.entries({ rating: order.rating, followedCount: order.followedCount })) {
            finalOrderedQuery[`order[${key}]`] = value;
        }

        return searchManga({ ...finalOrderedQuery });
    } catch (error) {
        throw new Error('Failed to fetch manga by rating');
    }
};

const getMangaChapter = async (mangaId) => {
    try {
        const response = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
            params: {
                translatedLanguage: ['en'],
                'order[chapter]': 'asc'
            }
        });
        if (response.data.result === 'ok') {
            const filteredData = response.data.data.map(item => ({
                id: item.id,
                volume: item.attributes.volume,
                chapter: item.attributes.chapter,
                title: item.attributes.title,
                publishAt: item.attributes.publishAt
            }));
            return filteredData;
        } else {
            throw new Error('Failed to fetch manga feed');
        }
    } catch (error) {
        throw new Error('Failed to fetch manga feed');
    }

}

module.exports = {
    searchManga,
    getMangaByTagID,
    getMangaByRating,
    getMangaChapter
};
