--select * from quyen where ten_quyen = 'ROLE_ADMIN' or  ten_quyen = 'ROLE_DIRECTOR'
--Select navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, badges.id as badge_id, badges."text", badges.variant from quyen 
--inner join navigration_roles nvr on quyen.id = nvr.role_id
--inner join navigration on navigration.id = nvr.navigration_id
--left join badges on badges.id = navigration.badge_id
--where quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_ADMIN' 
--order by navigration.sort_num asc

select DISTINCT ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, badges.id as badge_id, badges."text", badges.variant from navigration 
left join navigration_roles navr on navigration.id = navr.navigration_id
right join quyen on navr.role_id = quyen.id
left join badges on badges.id = navigration.badge_id
where quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_ADMIN' 

select DISTINCT ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, badges.id as badge_id, badges."text", badges.variant from navigration 
left join navigration_roles navr on navigration.id = navr.navigration_id
right join quyen on navr.role_id = quyen.id
left join badges on badges.id = navigration.badge_id quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_ADMIN'

select * from navigration

ALTER TABLE navigration 
DROP COLUMN has_children,
DROP COLUMN is_children;


select DISTINCT ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, badges.id as badge_id, badges."text", badges.variant from navigration 
left join navigration_roles navr on navigration.id = navr.navigration_id
right join quyen on navr.role_id = quyen.id
left join badges on badges.id = navigration.badge_id where quyen.ten_quyen = 'ROLE_ADMIN' 

select * from tai_khoan where email like 'nguyen%' or ten_tai_khoan like 'nguyen%' or email like '%duoc' or ten_tai_khoan like '%duoc' 

select * from tai_khoan where email like 'ntduoc%' or ten_tai_khoan like 'ntduoc%' or email like '%admin' or ten_tai_khoan like '%admin' 



select * from tai_khoan where email like 'ntduoc%' or ten_tai_khoan like 'ntduoc%' where email like ? or ten_tai_khoan like ? LIMIT 3 OFFSET 0

select nav.id, nav.name, nav.url, nav.icon,nav.title,nav.has_children, nav.is_children, nav.badge_id, nav.variant, nav."text" from (
	select distinct ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, navigration.has_children, navigration.is_children, badges.id as badge_id, badges."text", badges.variant from navigration
	inner join navigration_roles navr on navigration.id = navr.navigration_id
	left join quyen on navr.role_id = quyen.id
	left join badges on badges.id = navigration.badge_id
	where quyen.ten_quyen = 'ROLE_ADMIN' or quyen.ten_quyen = 'ROLE_LEADER' or quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_EMPLOYEE' ) nav
order by nav.sort_num DESC


select distinct ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, navigration.has_children, navigration.is_children, badges.id as badge_id, badges."text", badges.variant from navigration
	inner join navigration_roles navr on navigration.id = navr.navigration_id
	left join quyen on navr.role_id = quyen.id
	left join badges on badges.id = navigration.badge_id
 where quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_EMPLOYEE' or quyen.ten_quyen = 'ROLE_LEADER' or quyen.ten_quyen = 'ROLE_ADMIN' ) nav order by nav.sort_num ASC



select nav.id, nav.name, nav.url, nav.icon,nav.title,nav.has_children, nav.is_children, nav.badge_id, nav.variant, nav."text" from (
 select distinct ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, navigration.has_children, navigration.is_children, badges.id as badge_id, badges."text", badges.variant from navigration
 inner join navigration_roles navr on navigration.id = navr.navigration_id
 left join quyen on navr.role_id = quyen.id
 left join badges on badges.id = navigration.badge_id
 where quyen.ten_quyen = 'ROLE_ADMIN' or quyen.ten_quyen = 'ROLE_EMPLOYEE' or quyen.ten_quyen = 'ROLE_DIRECTOR' or quyen.ten_quyen = 'ROLE_LEADER' ) order by nav.sort_num ASC
 
 
 
select nav.id, nav.name, nav.url, nav.icon,nav.title,nav.has_children, nav.is_children, nav.badge_id, nav.variant, nav."text" from (
	select distinct ON (navigration.id) navigration.id, navigration."name", navigration.url, navigration.icon, navigration.title, navigration.sort_num, navigration.has_children, navigration.is_children, badges.id as badge_id, badges."text", badges.variant from navigration
	inner join navigration_roles navr on navigration.id = navr.navigration_id
	left join quyen on navr.role_id = quyen.id
	left join badges on badges.id = navigration.badge_id
 where navigration.is_children = false and (
 	quyen.ten_quyen = 'ROLE_DIRECTOR' 
 or quyen.ten_quyen = 'ROLE_EMPLOYEE' 
 or quyen.ten_quyen = 'ROLE_LEADER' 
 or quyen.ten_quyen = 'ROLE_ADMIN')  ) nav order by nav.sort_num ASC
 
 
 
select * from quyen inner join quyen_tai_khoan on quyen.id = quyen_tai_khoan.quyen_id
where quyen_tai_khoan.tai_khoan_id = 1
 
select * from Navigration n where n.id_parent = 1 