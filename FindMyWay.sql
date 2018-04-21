CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE Images(
userid int(5) not null,
topLeftLat FLoat(6,4) not null,
topLeftLong FLoat(6,4) not null,
topRightLat FLoat(6,4) not null,
topRightLong FLoat(6,4) not null,
rotation int(5),
dataURL MediumText not null,
uniqueName varchar(100) not null,
PRIMARY KEY (uniqueName)
);