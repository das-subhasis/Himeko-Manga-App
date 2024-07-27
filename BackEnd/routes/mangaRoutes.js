const express = require('express');
const asyncHandler = require('express-async-handler');
const {
    searchManga,
    getMangaByTagID,
    getMangaByRating
} = require('../controller/MangaController');

const router = express.Router();

router.get('/searchManga', asyncHandler(async (req, res) => {
    const params = req.query;
    const result = await searchManga(params);
    res.json(result);
}));

router.get('/getMangaByTagID', asyncHandler(async (req, res) => {
    const include = req.query.include ? req.query.include.split(',') : [];
    const exclude = req.query.exclude ? req.query.exclude.split(',') : [];
    const result = await getMangaByTagID(include, exclude);
    res.json(result);
}));

router.get('/getMangaByRating', asyncHandler(async (req, res) => {
    const { rating, followedCount } = req.query;
    const result = await getMangaByRating(rating, followedCount);
    res.json(result);
}));

router.get('/manga-cover/:mangaId/:coverArtUrl', async (req, res) => {
    const { mangaId, coverArtUrl } = req.params;
    const imageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${coverArtUrl}`;
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Failed to fetch image');
    }
});

module.exports = router;