Create Database resourcesHQ;
Use resourcesHQ;

DROP TABLE users;
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(20),
    email VARCHAR(30),
    password VARCHAR(20),
	userrole VARCHAR(8),
	registerstatus VARCHAR(10)
);

DROP TABLE resources;
CREATE TABLE resources (
    ID INT IDENTITY PRIMARY KEY,
    resourceTitle VARCHAR(50),
    UploaderID INT,
    UploadDate DATE,
    likes INT,
    dislikes INT,
    descp VARCHAR(300),
    status VARCHAR(10),
	link VARCHAR(100),
	course VARCHAR(25),
	filetype VARCHAR(5)
);

DROP TABLE userBookmarks;
CREATE TABLE userBookmarks (
    resID INT,
	stID INT
);

DROP TABLE registeredcourses;
CREATE TABLE registeredcourses (
	studentID INT,
	course VARCHAR(15)
);

DROP TABLE chatrooms;
CREATE TABLE chatrooms (
    ID INT IDENTITY PRIMARY KEY,
    chatroomName VARCHAR(50)
);

DROP TABLE resourceComments;
CREATE TABLE resourceComments (
    ID INT IDENTITY PRIMARY KEY,
    resourceID INT,
    comment VARCHAR(200),
	commentdate DATE,
	commentorID int
);

DROP TABLE chatroomComments;
CREATE TABLE chatroomComments (
    comentID INT IDENTITY PRIMARY KEY,
    roomID INT,
	chat VARCHAR(500),
	msgTime DATE,
	personID INT
);

INSERT INTO userBookmarks (resID, stID) VALUES
(1, 1), (3, 1), (7, 1);

INSERT INTO chatrooms (chatroomName) VALUES
('Database Course Room'), ('AI/ML Course Room') 

INSERT INTO chatroomComments (roomID, chat, msgTime, personID) VALUES
(1, 'Hey, how is everyone doing today?', '2024-05-04', 1),
(1, 'I''m doing great, thanks for asking!', '2024-05-04', 2),
(1, 'I''m not feeling too well, unfortunately.', '2024-05-04', 3),
(2, 'Has anyone seen the latest lecture notes', '2024-05-03', 2),
(2, 'Yes, It was depressing:(', '2024-05-03', 1),
(2, 'No, I haven''t had a chance to check it yet.', '2024-05-03', 2);

INSERT INTO users (name, email, password, userrole, registerstatus) VALUES
('Hamza Khalid', 'hk@nu.edu.pk', 'h123', 'student', 'registered'),
('Qahafa Ahmad', 'qa@nu.edu.pk', 'q123', 'student', 'pending'),
('Rayyan M. Zia', 'rz@nu.edu.pk', 'r123', 'student', 'registered'),
('admin', 'admin@nu.edu.pk', 'a123', 'admin', 'registered');

INSERT INTO resources (resourceTitle, UploaderID, UploadDate, likes, dislikes, descp, status, link, course, filetype) VALUES
('Introduction to SQL', 1, '2024-04-27', 10, 2, 'An intro book for SQL Beginners',
'approved', 'https://drive.google.com/file/d/1naEH6E9G1BeqW-ExVoPP8UxRY40MCG5j/view?usp=drive_link', 'Database', 'txt'),
('Data Modeling Basics', 2, '2024-04-25', 15, 5, 'How to model Data, related to Statistical Modelling Course for Semester 5',
'approved', 'https://drive.google.com/file/d/19ry2auSW6MCd7KL_COOybTGRcTBF5cuL/view?usp=drive_link', 'Stat Modeling', 'txt'),
('Advanced SQL Techniques', 3, '2024-04-26', 20, 3, 'Book 2 for SQL, go read intro to SQL first',
'approved', 'https://drive.google.com/file/d/1lngr5S7rZNkIM2OiHRaS-WXmEfmk2tNn/view?usp=drive_link', 'Database', 'txt'),
('Software Architectures', 3, '2024-04-26', 0, 0, 'Collection of all state-of-the-art architectures used when designing softwares',
'pending', 'https://drive.google.com/file/d/1kxaBV4UBw7V_moR3VM3LeBisZY-ESB2D/view?usp=drive_link', 'Software Engineering', 'txt'),
('Data Analysis with Python', 2, '2024-04-28', 25, 7, 'A comprehensive guide to data analysis using Python programming language',
'approved', 'https://drive.google.com/file/d/1q9phEnsP7rO03dsOQ5QjyDkdQ-5eqVRl/view?usp=drive_link', 'Data Science', 'txt'),
('Machine Learning Fundamentals', 1, '2024-04-29', 30, 4, 'Introduction to machine learning concepts and algorithms',
'approved', 'https://drive.google.com/file/d/1saYLRPa3LpT9byS4BZCTiuxviu9Wm9Cm/view?usp=drive_link', 'AI/ML', 'txt'),
('Database Management Systems', 1, '2024-04-30', 20, 6, 'Comprehensive coverage of database management systems principles and implementation',
'approved', 'https://drive.google.com/file/d/1r8y8Hbq0PjhUlQh_KunYcawXYYDf_SyL/view?usp=drive_link', 'Database', 'txt');

INSERT INTO resourceComments (resourceID, comment, commentdate, commentorID) VALUES
(2, 'Please delete before I report useless resources', '2024-05-20', 3),
(2, 'y is this a thing', '2024-04-25', 1),
(1, 'This is helpful for all platforms, MySQL, SQL Server and MongoDB.', '2024-03-02', 2),
(4, 'Helpful for all levels.', '2024-04-19', 3),
(1, 'v gud', '2024-07-09', 3),
(3, 'dem I prefer Intro to SQL more', '2024-11-20', 2);


INSERT INTO registeredcourses (studentID, course) VALUES
(3, 'Database'), (3, 'AI/ML'), (3, 'Stat Modeling'), (1, 'Data Science');


SELECT r.ID, resourceTitle, UploadDate, likes, dislikes, descp, link, r.status, s.name, course, filetype
FROM resources r JOIN users s ON r.UploaderID = s.id
WHERE r.status = 'approved' AND resourceTitle LIKE '%data%'

SELECT c.ID, comment, commentdate, name FROM resourceComments c
JOIN Students s ON c.commentorID = s.id
WHERE c.resourceID = 2

select * from resourceComments

SELECT ID FROM resources WHERE status = 'reported'

SELECT * FROM users

SELECT ID, resourceTitle, link, course, filetype
FROM resources WHERE course IN 
(SELECT course FROM registeredcourses WHERE studentID = 1 );
