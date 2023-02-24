-- procedure view hotel 
CREATE OR REPLACE PROCEDURE hotel.card_hotel()
AS $$
BEGIN
    CREATE VIEW hotel.card_hotel AS 
	select h.hotel_id, h.hotel_name, h.hotel_description, h.hotel_rating_star, h.hotel_phonenumber,
		  faci_group.faci_hotelall, string_agg(photo_hotel.url, ', ')as url, addrees.place
   from hotel.hotels h 
   join 
   (select faci_hotel_id, string_agg(faci_name, ', ')as faci_hotelall
   from hotel.facilities group by faci_hotel_id)faci_group
   on h.hotel_id = faci_group.faci_hotel_id
   join 
   (select (f.faci_hotel_id) as hotel_id, faci_cagro_id, f.faci_name, (ph.fapho_url) as url, ph.fapho_primary 
   from hotel.facility_photos ph
   join hotel.facilities f on ph.fapho_faci_id = f.faci_id 
   where ph.fapho_primary = '1' and f.faci_cagro_id=2)photo_hotel
   on h.hotel_id = photo_hotel.hotel_id
   join
   (select (a.addr_id)hotel_addr_id, concat(a.addr_line1,' ',p.prov_name,' ',c.country_name,' ',r.region_name)place 
	from master.address a
	join master.provinces p on a.addr_prov_id = p.prov_id
	join master.country c on p.prov_country_id = c.country_id
	join master.regions r on r.region_code = c.country_region_id)addrees
	on h.hotel_addr_id = addrees.hotel_addr_id group by h.hotel_id, faci_group.faci_hotelall, addrees.place;
END; $$
LANGUAGE plpgsql;
call hotel.card_hotel()
SELECT * FROM hotel.card_hotel;

-- drop procedure card
drop procedure hotel.card_hotel()
drop view hotel.card_hotel
-- end

-- prosedur menampilakn user review
CREATE OR REPLACE PROCEDURE hotel.user_review()
AS $$
BEGIN
    CREATE VIEW hotel.user_review AS
	select hr.hore_hotel_id, u.user_full_name, u.user_email, hr.hore_user_review, hr.hore_created_on, hr.hore_rating
  	from hotel.hotel_reviews hr
	join users.users u
	on hr.hore_user_id = u.user_id;
END; $$
LANGUAGE plpgsql;
call hotel.user_review()
select * from hotel.user_review
-- 	end

-- procedur faci all hotel
CREATE OR REPLACE PROCEDURE hotel.faci_allhotel()
AS $$
BEGIN
    CREATE VIEW hotel.faci_allhotel AS
	select *
	from hotel.hotels h join hotel.facilities f 
	on h.hotel_id = f.faci_hotel_id
	join (select fapho_faci_id, string_agg(fapho_url,', ')as fapho_url
			from hotel.facility_photos group by fapho_faci_id) fap
	on f.faci_id = fap.fapho_faci_id;
END; $$
LANGUAGE plpgsql;
call hotel.faci_allhotel()
select * from hotel.faci_allhotel

drop view hotel.faci_allhotel
-- end

select fapho_faci_id, string_agg(fapho_url,', ')as fapho_url
from hotel.facility_photos group by fapho_faci_id

select * from hotel.facility_photos where fapho_faci_id = 1

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


-- users review
select * from hotel.hotel_reviews hr
join users.users u
on hr.hore_user_id = u.user_id

-- function prosedure hore review 

CREATE OR REPLACE FUNCTION hotel.get_review(p_id INTEGER)
RETURNS TABLE (
  hotel_id integer,
  name character varying(55),
  email character varying(256),
  review character varying(125),
  created timestamp,
  rating integer
) AS $$
BEGIN
  RETURN QUERY 
  select hr.hore_hotel_id, u.user_full_name, u.user_email, hr.hore_user_review, hr.hore_created_on, hr.hore_rating
  from hotel.hotel_reviews hr
	join users.users u
	on hr.hore_user_id = u.user_id
	where hore_hotel_id = p_id;
END;
$$ LANGUAGE plpgsql;
DROP FUNCTION hotel.get_review(integer)

select * from hotel.get_review(1)





-- fungsi tampil faci img di hotel detail
CREATE OR REPLACE FUNCTION hotel.get_fapho(p_id INTEGER)
RETURNS TABLE (
  hotel_id integer,
  url character varying(255),
  name character varying(125)
) AS $$
BEGIN
  RETURN QUERY 
  select f.faci_hotel_id, fap.fapho_url, f.faci_name
from hotel.facilities f join hotel.facility_photos fap
on f.faci_id = fap.fapho_faci_id
where faci_hotel_id = p_id;
END;
$$ LANGUAGE plpgsql;

select * from hotel.get_fapho(1)

-- find card by id
CREATE OR REPLACE FUNCTION hotel.get_cardid(id integer)
RETURNS TABLE (
  hotel_id integer,
  hotel_name character varying(85),
  hotel_description character varying(500),
  hotel_rating_star smallint,
  hotel_phonenumber character varying(25),
  faci_hotelall text,
  url character varying(255),
  place text
) AS $$
BEGIN
  RETURN QUERY 
  select h.hotel_id, h.hotel_name, h.hotel_description, h.hotel_rating_star, h.hotel_phonenumber,
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
	on h.hotel_addr_id = addrees.hotel_addr_id
	where h.hotel_id = id;
END;
$$ LANGUAGE plpgsql;
DROP FUNCTION hotel.get_cardid(text)
select * from hotel.get_cardid(0)

select * from get_review(1)



 	