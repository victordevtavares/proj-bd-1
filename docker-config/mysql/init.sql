CREATE USER 'my_admin'@'localhost' IDENTIFIED BY 'mypass';
GRANT ALL PRIVILEGES ON *.* TO 'my_admin'@'localhost' WITH GRANT OPTION;
CREATE USER 'my_admin'@'%' IDENTIFIED BY 'mypass';
GRANT ALL PRIVILEGES ON *.* TO 'my_admin'@'%' WITH GRANT OPTION;

CREATE DATABASE IF NOT EXISTS my_school;

USE my_school;

CREATE TABLE IF NOT EXISTS students (
	id int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(150) NOT NULL,
    course varchar(150) NOT NULL,
    active boolean DEFAULT false
);

ALTER TABLE students AUTO_INCREMENT = 20210001;