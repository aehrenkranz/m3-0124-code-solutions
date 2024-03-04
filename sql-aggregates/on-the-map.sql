select "countries"."name" as "countryName",
count ("cityId") as "totalCities"
from "cities"
join "countries" using ("countryId")
group by "countries"."name"
