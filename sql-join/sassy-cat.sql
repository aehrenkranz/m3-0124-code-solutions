select "firstName",
"lastName",
"films"."title"
from "actors"
join "castMembers" on "actors"."actorId"="castMembers"."actorId"
join "films" using ("filmId")
where "films"."title"='Jersey Sassy'
