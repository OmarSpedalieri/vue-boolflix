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
const api_key= '010df9bf30e5f23360b2a681c219f1a0'
const searchMovie = 'https://api.themoviedb.org/3/search/movie?'
const movie_db = "https://api.themoviedb.org/3/search/movie";

var app = new Vue({

  el: "#app",
  data:{
    searched_movie:"",
    movies:[], // array vuoto che riempio interrogando l api con axios
  },
  methods:{

    find:function () {
    axios.get(movie_db,{
      params:{
          query:this.searched_movie,
          api_key:api_key
        }
        }
    ).then(answer => {
      //popolo il mio array album con le response di
      // ogni elemento disc che mi manda axios
     this.movies = answer.data.results;
     console.log("Movies:", this.movies);

   })}}
  // },
  // methods:{
  //   genrePicker(){
  //     if (this.type === "all") {
  //       this.albums_picked = this.albums;
  //     }else{
  //       this.albums_picked = this.albums.filter(item => item.genre === this.type);
  //     }
  //   }
  // },
  // computed:{
  //   genreFilter : function(){
  //     return this.albums.filter((album) => {
  //
  //      if (this.type === "all") {
  //        return this.albums;
  //      } else {
  //        return album.genre === this.type;
  //      }
  //    })
  //   }
  // }

});
