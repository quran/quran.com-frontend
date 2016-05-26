
API Reference: http://staging.quran.com:3000/docs

Options:

    curl -s http://api.quran.com:3000/options/language | python -m json.tool
    curl -s http://api.quran.com:3000/options/quran | python -m json.tool
    curl -s http://api.quran.com:3000/options/content | python -m json.tool
    curl -s http://api.quran.com:3000/options/audio | python -m json.tool

Pages:

    curl -s http://api.quran.com:3000/v2/pages/10 | python -m json.tool
    No JSON object could be decoded

Surahs:

    curl -s http://api.quran.com:3000/v2/surahs/1 | python -m json.tool
    curl -s http://api.quran.com:3000/v2/surahs/114 | python -m json.tool
    curl -s http://api.quran.com:3000/v2/surahs | python -m json.tool

Search:

    curl -s 'http://api.quran.com:3000/v2/search?q=allah&size=2' | python -m json.tool

Ayahs:

    curl -s 'http://api.quran.com:3000/v2/surahs/114/ayahs?from=1&to=3' | python -m json.tool
    {
        "error": "Internal Server Error",
        "status": "500"
    }

