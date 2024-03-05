select "firstName","lastName",
sum("payments"."amount") as "totalPaymentAmount"
from "customers"
join "payments" using ("customerId")
group by "customerId"
order by "totalPaymentAmount" desc
