select 
	authoritie0_.tai_khoan_id as tai_khoa1_1_0_, 
	authoritie0_.quyen_id as quyen_id2_1_0_, 
	roles1_.id as id1_0_1_, 
	roles1_.code_quyen as code_quy2_0_1_, 
	roles1_.ten_quyen as ten_quye3_0_1_ 
from 
	quyen_cua_tai_khoan authoritie0_ inner join quyen roles1_ on authoritie0_.quyen_id=roles1_.id where authoritie0_.tai_khoan_id=1