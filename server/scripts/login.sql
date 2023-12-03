--INIT#login#

SELECT idcompany, name, email, password, logo FROM company WHERE email = @email

--END#login#