DROP TRIGGER IF EXISTS trg_nhap_hang ON public.chi_tiet_hoa_don_nhap CASCADE ;

insert into quy_dinh_don_vi_san_pham(san_pham_id, quy_dinh_don_vi_id) values(1,1);

select qddv
			from quy_dinh_don_vi qddv inner join quy_dinh_don_vi_san_pham qddvsp on qddv.id = qddvsp.quy_dinh_don_vi_id
			where qddvsp.san_pham_id = 1 and qddv.don_vi_quy_doi = 4;

select * from san_pham sp inner join quy_dinh_don_vi_san_pham qddvsp on sp.id = qddvsp.san_pham_id
	inner join quy_dinh_don_vi qddv on qddv.id = qddvsp.quy_dinh_don_vi_id
	where sp.id = 1 and qddv.don_vi_chuan = sp.don_vi_id;
	
select * from san_pham

ALTER TABLE public.quy_dinh_don_vi ALTER COLUMN dinh_muc_quy_doi TYPE numeric(10,2) USING dinh_muc_quy_doi::numeric;

INSERT INTO public.quy_dinh_don_vi
(don_vi_chuan, don_vi_quy_doi, dinh_muc_quy_doi)
VALUES(4, 5, 0.20);


select count(*)
	from lich_su_gia lsg inner join san_pham sp on lsg.san_pham_id = sp.id
	where lsg.san_pham_id = 1 and lsg.ngay_tao::date = sp.ngay_nhap_cuoi_cung::date and lsg.gia = 120000;


