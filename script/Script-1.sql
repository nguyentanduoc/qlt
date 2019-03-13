CREATE OR REPLACE FUNCTION func_xuat_hang()
  RETURNS trigger AS
$$
declare
dv_chuan_sp integer :=0;
dinh_muc_quy_doi real;
begin
	select sp.don_vi_id into dv_chuan_sp
	from san_pham sp
	where sp.id = new.san_pham_id;
	
	if dv_chuan_sp = new.don_vi_id then 
		update san_pham_cua_chi_nhanh as spccn set so_luong = spccn.so_luong - new.so_luong
		from chi_tiet_hoa_don_xuat cthdx 
			inner join hoa_don_xuat hdx on cthdx.hoa_don_nhap_id = hdx.id
		where spccn.san_pham_id = new.san_pham_id and spccn.chi_nhanh_id = hdx.chi_nhanh_id;
	else 
		select qddv.dinh_muc_quy_doi into dinh_muc_quy_doi
			from san_pham sp 
				inner join quy_dinh_don_vi_san_pham qddvsp on sp.id = qddvsp.san_pham_id
				inner join quy_dinh_don_vi qddv on qddv.id = qddvsp.quy_dinh_don_vi_id
			where sp.id = new.san_pham_id and qddv.don_vi_quy_doi = new.don_vi_id and qddv.don_vi_chuan = sp.don_vi_id;
		
		if not found then 
				raise exception 'dinh_muc_quy_doi không tồn tại với sản phẩm này';
			else 
				update san_pham_cua_chi_nhanh as spccn set so_luong = spccn.so_luong - (new.so_luong * dinh_muc_quy_doi)
					from chi_tiet_hoa_don_xuat cthdx 
						inner join hoa_don_xuat hdx on cthdx.hoa_don_nhap_id = hdx.id
					where spccn.san_pham_id = new.san_pham_id and spccn.chi_nhanh_id = hdx.chi_nhanh_id;
			end if;
	end if;	
 RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

create trigger trg_xuat_hang 
	after insert 
	on chi_tiet_hoa_don_xuat
	for each row
	execute procedure func_xuat_hang();