//
// Descrizione:
// Facciamo una chiamata ajax all’api di boolean al seguente indirizzo.
// https://flynn.boolean.careers/exercises/api/array/music
// L’api ci restituirà una decina di dischi musicali che dovremo stampare a schermo con Vue.
// Concentratevi sulla parte JS,
// per la grafica avete come ref lo screeshot,
// ma i dettagli lasciateli per la fine.
//
// Creare una select con i seguenti generi: pop, rock, metal e jazz.
// In base a cosa scegliamo nella select vedremo solo i corrispondenti cd.
const api_key = '010df9bf30e5f23360b2a681c219f1a0';
const movie_db = "https://api.themoviedb.org/3/search/movie";
const series_db = "https://api.themoviedb.org/3/search/tv";



var app = new Vue({

  el: "#app",
  data:{
    searched_movie:"",
    movies:[],
    series:[],
    mergedMedia:[]

  },
  methods:{

    findMovie:function () {
    axios.get(movie_db,{params:{query:this.searched_movie,api_key:api_key}})
    .then(answer => {
     this.movies = answer.data.results;
     this.movieResults();
    })},

    findTvseries:function () {
    axios.get(series_db,{params:{query:this.searched_movie,api_key:api_key}})
    .then(answer => {
     this.series = answer.data.results;
     this.tvSeriesResults();

   })},

   showSelected:function(){
     this.findMovie();
     this.findTvseries();
     this.mergingResults();
   },

    //************ MOVIES SEARCH  ***************
    movieResults: function(){

     this.movies.forEach((film) => {
       film.poster_path = "https://image.tmdb.org/t/p/w342" + film.poster_path;
       film.vote_average = Math.ceil(film.vote_average / 2);
       if (film.original_language != "") {
         film.original_language = "img/flags/" + film.original_language + ".png";
       }else{
         film.original_language = "img/flags/unknown.png";
       }
     })
   },

   //************ TV SERIES SEARCH  ***************

    tvSeriesResults: function(){

     this.series.forEach((serie) => {
       serie.poster_path = "https://image.tmdb.org/t/p/w342" + serie.poster_path;
       serie.vote_average = Math.ceil(serie.vote_average / 2);
       if (serie.original_language != null) {
         serie.original_language = "img/flags/" + serie.original_language + ".png";
       }else{
         serie.original_language = "Language N/A";
       }
     })
    },

    mergingResults:function(){
      this.mergedMedia = [...this.movies,...this.series];
    }

  }
});
