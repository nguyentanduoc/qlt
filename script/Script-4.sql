update san_pham_cua_chi_nhanh
set san_pham_cua_chi_nhanh.so_luong = cthdn.so_luong + san_pham_cua_chi_nhanh.so_luong
from chi_tiet_hoa_don_nhap cthdn inner join hoa_don_nhap hdn on cthdn.hoa_don_nhap_id = hdn.id
where san_pham_cua_chi_nhanh.san_pham_id = new.san_pham_id and san_pham_cua_chi_nhanh.chi_nhanh_id = hdn.chi_nhanh_id;

update san_pham_cua_chi_nhanh spcn
set spcn.so_luong = spcn.so_luong - 1
where spcn.id = 1;