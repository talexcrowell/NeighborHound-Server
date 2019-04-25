'use strict'; 

const express = require('express');
const router = express.Router();
const knex = require('../db/knex/knex');
const axios=require('axios');
const { MOVIEDB_API_KEY } = require('../config');

function standardizeMovieDBTVData(data){
  return data.results.map(item => {
    let genres = [];
    let genreNumber =[
      {
        'id': 28,
        'name': 'Action'
      },
      {
        'id': 12,
        'name': 'Adventure'
      },
      {
        'id': 16,
        'name': 'Animation'
      },
      {
        'id': 35,
        'name': 'Comedy'
      },
      {
        'id': 80,
        'name': 'Crime'
      },
      {
        'id': 99,
        'name': 'Documentary'
      },
      {
        'id': 18,
        'name': 'Drama'
      },
      {
        'id': 10751,
        'name': 'Family'
      },
      {
        'id': 14,
        'name': 'Fantasy'
      },
      {
        'id': 36,
        'name': 'History'
      },
      {
        'id': 27,
        'name': 'Horror'
      },
      {
        'id': 10402,
        'name': 'Music'
      },
      {
        'id': 9648,
        'name': 'Mystery'
      },
      {
        'id': 10749,
        'name': 'Romance'
      },
      {
        'id': 878,
        'name': 'Science Fiction'
      },
      {
        'id': 10770,
        'name': 'TV Movie'
      },
      {
        'id': 53,
        'name': 'Thriller'
      },
      {
        'id': 10752,
        'name': 'War'
      },
      {
        'id': 37,
        'name': 'Western'
      }
    ];

    if(item.genres){
      for(let i=0; i < item.genres.length; i++){
        let find = genreNumber.filter(genre => item.genres[i].id === genre.id)[0];
        console.log(find);
        genres.push(find.name);
      }
    }
    let url = `https://www.themoviedb.org/tv/${item.id}`;
    let img = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`;
    return {
      title: item.name,
      movieDbId: item.id,
      movieDbrating: item.vote_average,
      url,
      language: item.original_language,
      released: item.first_air_date,
      img, 
      overview: item.overview,
      genres: item.genres,
      type: 'TV'
    };
  });
}

function standardizeMovieDBTVDetailsData(data){
  return data.map(item => {
    let genres = [];
    let genreNumber =[
      {
        'id': 28,
        'name': 'Action'
      },
      {
        'id': 12,
        'name': 'Adventure'
      },
      {
        'id': 16,
        'name': 'Animation'
      },
      {
        'id': 35,
        'name': 'Comedy'
      },
      {
        'id': 80,
        'name': 'Crime'
      },
      {
        'id': 99,
        'name': 'Documentary'
      },
      {
        'id': 18,
        'name': 'Drama'
      },
      {
        'id': 10751,
        'name': 'Family'
      },
      {
        'id': 14,
        'name': 'Fantasy'
      },
      {
        'id': 36,
        'name': 'History'
      },
      {
        'id': 27,
        'name': 'Horror'
      },
      {
        'id': 10402,
        'name': 'Music'
      },
      {
        'id': 9648,
        'name': 'Mystery'
      },
      {
        'id': 10749,
        'name': 'Romance'
      },
      {
        'id': 878,
        'name': 'Science Fiction'
      },
      {
        'id': 10770,
        'name': 'TV Movie'
      },
      {
        'id': 53,
        'name': 'Thriller'
      },
      {
        'id': 10752,
        'name': 'War'
      },
      {
        'id': 37,
        'name': 'Western'
      }
    ];

    let url = `https://www.themoviedb.org/tv/${item.id}`;
    let img = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`;
    return {
      title: item.name,
      movieDbId: item.id,
      movieDbrating: item.vote_average,
      url,
      language: item.original_language,
      released: item.first_air_date,
      img, 
      overview: item.overview,
      lastEpisode: item.last_episode_to_air,
      nextEpisode: item.next_episode_to_air,
      totalEpisodes: item.number_of_episodes,
      totalSeasons: item.number_of_seasons,
      networks: item.networks,
      genres: item.genres,
      type: 'TV'
    };
  });
}

function standardizeMovieDBMovieData(data){
  return data.results.map(item => {
    let genres = [];
    let genreNumber =[
      {
        'id': 28,
        'name': 'Action'
      },
      {
        'id': 12,
        'name': 'Adventure'
      },
      {
        'id': 16,
        'name': 'Animation'
      },
      {
        'id': 35,
        'name': 'Comedy'
      },
      {
        'id': 80,
        'name': 'Crime'
      },
      {
        'id': 99,
        'name': 'Documentary'
      },
      {
        'id': 18,
        'name': 'Drama'
      },
      {
        'id': 10751,
        'name': 'Family'
      },
      {
        'id': 14,
        'name': 'Fantasy'
      },
      {
        'id': 36,
        'name': 'History'
      },
      {
        'id': 27,
        'name': 'Horror'
      },
      {
        'id': 10402,
        'name': 'Music'
      },
      {
        'id': 9648,
        'name': 'Mystery'
      },
      {
        'id': 10749,
        'name': 'Romance'
      },
      {
        'id': 878,
        'name': 'Science Fiction'
      },
      {
        'id': 10770,
        'name': 'TV Movie'
      },
      {
        'id': 53,
        'name': 'Thriller'
      },
      {
        'id': 10752,
        'name': 'War'
      },
      {
        'id': 37,
        'name': 'Western'
      }
    ];

    if(item.genre_ids){
      for(let i=0; i < item.genre_ids.length; i++){
        let itemId = item.genre_ids[i];
        let match = genreNumber.filter(genre => genre.id === itemId);
        genres.push(match[0].name);
      }
    }
    let url = `https://www.themoviedb.org/tv/${item.id}`;
    let img = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`;
    return {
      title: item.title,
      movieDbId: item.id,
      movieDbrating: item.vote_average,
      url,
      language: item.original_language,
      released: item.release_date,
      img, 
      overview: item.overview,
      genres,
      type: 'TV'
    };
  });
}

function extractIds(data){
  return data.results.map(item => {
    return item.id;
  });
}

// adds response to database
router.get('/adadasdasdasd', (req, res ,next) => {
  return axios.all([
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${MOVIEDB_API_KEY}&page=1&region=US`),
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${MOVIEDB_API_KEY}&page=2&region=US`),
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${MOVIEDB_API_KEY}&page=3&region=US`)
  ])
    .then(axios.spread((results1, results2, results3) => {
      let output = [];
      let std1 = standardizeMovieDBTVData(results1.data);
      let std2 = standardizeMovieDBTVData(results2.data);
      let std3 = standardizeMovieDBTVData(results3.data);
      output = [...std1, ...std2, ...std3];

      return output;
    }))
    .then(data => {
      let output = [];
      for(let i=0; i < data.length; i++){
        let insertData = {
          title: data[i].title,
          moviedbid: data[i].movieDbId.toString(),
          moviedbrating: data[i].movieDbrating.toString(),
          url: data[i].url,
          released: data[i].released,
          img: data[i].img, 
          overview: data[i].overview,
          language: data[i].language,
          genres: 'filler'
        };
        output.push(insertData);
      }
      console.log('Added: '+ data.length + ' entries to movies table');
      return knex.insert(output).into('shows');
    })
    .then(() => res.json({Message: 'Movie table updated'}))
    .catch(err => next(err));
});

//quick reference db endpoints

router.get('/retrievemovies', (req, res ,next) => {
  knex.select().from('movies')
    .then(results => res.json(results));
});

router.get('/retrieveshows', (req, res ,next) => {
  knex.select().from('shows')
    .then(results => res.json(results));
});


//functional endpoints
router.get('/quickrec', (req, res ,next) => {
  let randomInt = Math.floor(Math.random()*9000)+1;
  if(randomInt % 2 === 0){
    return knex.select().from('movies').orderByRaw('RANDOM()')
      .then(results => res.json(results[0]));
  }
  else{
    return knex.select().from('shows').orderByRaw('RANDOM()')
      .then(results => res.json(results[0]));
  }

});

router.get('/catalog', (req, res ,next) => {
  Promise.all([
    knex.select().from('movies'),
    knex.select().from('shows')
  ])
    .then(([movieRes, tvRes]) => {
      let output = [...movieRes, ...tvRes];
      return output.sort((a,b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
    })
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.get('/upcoming', (req, res ,next) => {
  axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${MOVIEDB_API_KEY}&page=1&region=US`)
    .then(results => standardizeMovieDBMovieData(results.data))
    .then(data => res.json(data));
});

router.get('/airingtoday', (req, res ,next) => {
  axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${MOVIEDB_API_KEY}&language=en-US&page=1`)
    .then(data => extractIds(data.data))
    .then(ids => {
      let promisified = ids.map(id => axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MOVIEDB_API_KEY}`));
      return Promise.all(promisified)
        .then((details) => {
          let output = [];
          for(let i=0; i< details.length; i++){
            output.push(details[i].data);
          }
          return standardizeMovieDBTVDetailsData(output);
        })
        .then(data => res.json(data))
        .catch(err => next(err));
    });
});

router.get('/schedule', (req, res ,next) => {
  axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${MOVIEDB_API_KEY}&language=en-US&page=1`)
    .then(data => extractIds(data.data))
    .then(ids => {
      let promisified = ids.map(id => axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MOVIEDB_API_KEY}`));
      return Promise.all(promisified)
        .then((details) => {
          let output = [];
          for(let i=0; i< details.length; i++){
            output.push(details[i].data);
          }
          return standardizeMovieDBTVDetailsData(output);
        })
        .then(data => res.json(data))
        .catch(err => next(err));
    });
});

router.get('/nowplaying', (req, res ,next) => {
  axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIEDB_API_KEY}&page=1&language=en-US`)
    .then(results => standardizeMovieDBMovieData(results.data))
    .then(data => res.json(data));
});

router.get('/detailstest', (req, res ,next) => {
  axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${MOVIEDB_API_KEY}&append_to_response=next_episode_to_air`)
    .then(data => extractIds(data.data))
    .then(ids => {
      let promisified = ids.map(id => axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${MOVIEDB_API_KEY}&append_to_response=videos,images`));
      return Promise.all(promisified)
        .then((details) => {
          let output = [];
          for(let i=0; i< details.length; i++){
            output.push(details[i].data);
          }
          return output;
        })
        .then(results => standardizeMovieDBTVDetailsData(results))
        .then(data => res.json(data));
    });

});

module.exports = router;
