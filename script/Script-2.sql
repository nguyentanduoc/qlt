create table random_city (
	id serial not null,
	name varchar(254),
	primary key(id)
);

CREATE TABLE app_role (
	id serial NOT null,
	description varchar(255) ,
	role_name varchar(255) ,
	PRIMARY KEY (id)
);


CREATE TABLE app_user (
  id serial NOT null,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE user_role (
  user_id bigint(20) NOT NULL,
  role_id bigint(20) NOT NULL,
  CONSTRAINT FK859n2jvi8ivhui0rl0esws6o FOREIGN KEY (user_id) REFERENCES app_user (id),
  CONSTRAINT FKa68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES app_role (id)
);