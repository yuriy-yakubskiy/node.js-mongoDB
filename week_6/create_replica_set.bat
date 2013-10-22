set MONGODBPATH=D:\nodejs\nodejs_course\week_6\data

mkdir %MONGODBPATH%\rs0-0 %MONGODBPATH%\rs0-1 %MONGODBPATH%\rs0-2

::mongod --replSet rs1 --logpath "1.log" --dbpath %MONGODBPATH%\rs1 --port 27017 --serviceName mongoDB1 --serviceDisplayName mongoDB1 --remove
::mongod --replSet rs2 --logpath "2.log" --dbpath %MONGODBPATH%\rs2 --port 37017 --serviceName mongoDB2 --serviceDisplayName mongoDB2  --remove
::mongod --replSet rs3 --logpath "3.log" --dbpath %MONGODBPATH%\rs3 --port 47017 --serviceName mongoDB3 --serviceDisplayName mongoDB3 --remove


mongod --port 27017 --dbpath %MONGODBPATH%/rs0-0 --replSet rs0 --smallfiles --oplogSize 128
mongod --port 27018 --dbpath %MONGODBPATH%/rs0-1 --replSet rs0 --smallfiles --oplogSize 128
mongod --port 27019 --dbpath %MONGODBPATH%/rs0-2 --replSet rs0 --smallfiles --oplogSize 128