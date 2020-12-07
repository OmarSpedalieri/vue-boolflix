var app = new Vue({

  el: "#app",
  data:{
    api_key:'010df9bf30e5f23360b2a681c219f1a0',
    input:"",
    movies:[],
    series:[],
    all_Media:[]
  },
  methods:{

    //************ MOVIES SEARCH  ***************
    search_title: function(){

      // ****** VARIABILI CON API E KEY PER ACCESSO *******
      let movies = 'https://api.themoviedb.org/3/search/movie?'+ this.api_key;
      let series = 'https://api.themoviedb.org/3/discover/tv?'+ this.api_key;

      let search_movies = axios.get(movies,{params: {query: this.input}});
      let search_series = axios.get(series,{params: {query: this.input}});

      axios.all([search_movies, search_series]).then(axios.spread((...responses) => {
      this.movies = responses[0].data.results;
      this.series = responses[1].data.results;
      this.all_Media = [...this.movies,...this.series];
      this.analyze_media();

      }))
    },

      //************ MOVIES SEARCH  ***************
    analyze_media: function(){

     this.movies.forEach((film) => {
       film.poster_path = "https://image.tmdb.org/t/p/w342" + film.poster_path;
       film.vote_average = Math.ceil(film.vote_average / 2);
       if (film.original_language != "") {
         film.original_language = "img/flags/" + film.original_language + ".png";
       }else{
         film.original_language = "img/flags/unknown.png";
        }
      });
      //************ TV SERIES SEARCH  ***************
     this.series.forEach((serie) => {
       serie.poster_path = "https://image.tmdb.org/t/p/w342" + serie.poster_path;
       serie.vote_average = Math.ceil(serie.vote_average / 2);
       if (serie.original_language != null) {
         serie.original_language = "img/flags/" + serie.original_language + ".png";
       }else{
         serie.original_language = "img/flags/unknown.png";
       }
     });

    }
  }
});
