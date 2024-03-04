select "genres"."name" as "genre",
"title",
"releaseYear"
from "films"
join "filmGenre" using ("filmId")
join "genres" using ("genreId")
where "title" = 'Boogie Amelie'
