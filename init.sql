Create TABLE IF NOT EXISTS User(
    uid INT UNSIGNED NOT null auto_increment primary key,
    id varchar(50) not null unique,
    username varchar(100) not null,

    password varchar(255) not null,
    profile_img varchar(255) Default 'default.png',
    role varchar(20) default 'user',

    created_at timestamp default current_timestamp
);

insert into User (id,username,password,role)
value ('dkd462','fixjsl','$2y$10$et6gkKwBTviPaTlHJZQUc.9p/7zzDJrq3AH/uh949rC9til7PZtzS','root');

