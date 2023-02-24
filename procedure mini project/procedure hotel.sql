-- procedure view hotel 
CREATE OR REPLACE FUNCTION hotel.card_hotel ()
RETURNS SETOF record AS $$
DECLARE
BEGIN
   RETURN QUERY 
   select h.hotel_name, h.hotel_description, h.hotel_rating_star, h.hotel_phonenumber,
		  faci_group.faci_hotelall, photo_hotel.url, addrees.place
   from hotel.hotels h 
   join 
   (select faci_hotel_id, string_agg(faci_name, ', ')as faci_hotelall
   from hotel.facilities group by faci_hotel_id)faci_group
   on h.hotel_id = faci_group.faci_hotel_id
   join 
   (select (f.faci_hotel_id) as hotel_id, f.faci_name, (ph.fapho_url) as url, ph.fapho_primary 
   from hotel.facility_photos ph
   join hotel.facilities f on ph.fapho_faci_id = f.faci_id 
   where ph.fapho_primary = '1')photo_hotel
   on h.hotel_id = photo_hotel.hotel_id
   join
   (select (a.addr_id)hotel_addr_id, concat(a.addr_line1,' ',p.prov_name,' ',c.country_name,' ',r.region_name)place 
	from master.address a
	join master.provinces p on a.addr_prov_id = p.prov_id
	join master.country c on p.prov_country_id = c.country_id
	join master.regions r on r.region_code = c.country_region_id)addrees
	on h.hotel_addr_id = addrees.hotel_addr_id;
END; $$
LANGUAGE plpgsql;


select * from master.country

-- alamat hotel
select (a.addr_id)hotel_addr_id, concat(a.addr_line1,' ',p.prov_name,' ',c.country_name,' ',r.region_name) 
from master.address a
join master.provinces p on a.addr_prov_id = p.prov_id
join master.country c on p.prov_country_id = c.country_id
join master.regions r on r.region_code = c.country_region_id
-- potho hotel
select f.faci_hotel_id, f.faci_name, ph.fapho_url, ph.fapho_primary 
from hotel.facility_photos ph
join hotel.facilities f on ph.fapho_faci_id = f.faci_id 
where ph.fapho_primary = '1'

 	